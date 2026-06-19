package com.jmi.app.presentation.ui.screens

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Analytics
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.Work
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.jmi.app.presentation.ui.theme.*

import androidx.hilt.navigation.compose.hiltViewModel
import com.jmi.app.presentation.viewmodels.JobsViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DashboardScreen(
    onNavigateToJobs: () -> Unit,
    onNavigateToAnalytics: () -> Unit,
    onOpenDrawer: () -> Unit,
    viewModel: JobsViewModel = hiltViewModel()
) {
    val scrollState = rememberScrollState()

    val topSkills by viewModel.topSkills.collectAsState()
    val topLocations by viewModel.topLocations.collectAsState()

    val topSkillName = topSkills.firstOrNull()?.first ?: "Loading..."
    val topLocationName = topLocations.firstOrNull()?.first ?: "Loading..."

    Scaffold(
        containerColor = MaterialTheme.colorScheme.background,
        topBar = {
            TopAppBar(
                title = { },
                navigationIcon = {
                    IconButton(onClick = onOpenDrawer) {
                        Icon(Icons.Default.Menu, contentDescription = "Menu", tint = MaterialTheme.colorScheme.onBackground)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.Transparent)
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .verticalScroll(scrollState)
                .padding(24.dp)
        ) {
            // Header with Live Badge
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Dashboard",
                    color = MaterialTheme.colorScheme.onBackground,
                    fontSize = 28.sp,
                    fontWeight = FontWeight.Bold
                )

                LiveBadge()
            }

            Spacer(modifier = Modifier.height(32.dp))

            // Summary Cards
            SummaryCard(label = "Top Skill", value = topSkillName)
            Spacer(modifier = Modifier.height(16.dp))
            SummaryCard(label = "Top Location", value = topLocationName)
            Spacer(modifier = Modifier.height(16.dp))
            SummaryCard(label = "Market Status", value = "Active Hiring", valueColor = Green400)

            Spacer(modifier = Modifier.height(40.dp))

            Text(
                text = "Navigation",
                color = Gray400,
                fontSize = 16.sp,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier.padding(bottom = 16.dp)
            )

            // Navigation Cards
            NavCard(
                title = "View Available Jobs",
                subtitle = "Browse and filter the latest opportunities",
                icon = Icons.Default.Work,
                onClick = onNavigateToJobs
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            NavCard(
                title = "View Analytics",
                subtitle = "Deep dive into market trends",
                icon = Icons.Default.Analytics,
                onClick = onNavigateToAnalytics
            )
        }
    }
}

@Composable
fun LiveBadge() {
    val infiniteTransition = rememberInfiniteTransition()
    val alpha by infiniteTransition.animateFloat(
        initialValue = 1f,
        targetValue = 0.2f,
        animationSpec = infiniteRepeatable(
            animation = tween(1000, easing = LinearEasing),
            repeatMode = RepeatMode.Reverse
        )
    )

    Row(
        modifier = Modifier
            .clip(RoundedCornerShape(16.dp))
            .background(Green500.copy(alpha = 0.15f))
            .padding(horizontal = 12.dp, vertical = 6.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            modifier = Modifier
                .size(8.dp)
                .alpha(alpha)
                .clip(CircleShape)
                .background(Green500)
        )
        Spacer(modifier = Modifier.width(6.dp))
        Text(
            text = "Live",
            color = Green400,
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
fun SummaryCard(label: String, value: String, valueColor: Color = MaterialTheme.colorScheme.primary) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(MaterialTheme.colorScheme.surface)
            .border(1.dp, Gray700.copy(alpha = 0.5f), RoundedCornerShape(16.dp))
            .padding(20.dp)
    ) {
        Column {
            Text(
                text = label,
                color = Gray500,
                fontSize = 14.sp
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = value,
                color = valueColor,
                fontSize = 20.sp,
                fontWeight = FontWeight.SemiBold
            )
        }
    }
}

@Composable
fun NavCard(title: String, subtitle: String, icon: ImageVector, onClick: () -> Unit) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(Gray800)
            .border(1.dp, Green500.copy(alpha = 0.2f), RoundedCornerShape(16.dp))
            .clickable { onClick() }
            .padding(20.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .clip(CircleShape)
                    .background(Green500.copy(alpha = 0.1f))
                    .padding(12.dp)
            ) {
                Icon(icon, contentDescription = null, tint = Green400)
            }
            Spacer(modifier = Modifier.width(16.dp))
            Column {
                Text(
                    text = title,
                    color = Color.White,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = subtitle,
                    color = Gray400,
                    fontSize = 14.sp
                )
            }
        }
    }
}
