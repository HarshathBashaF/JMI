package com.jmi.app.presentation.ui.screens

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.jmi.app.presentation.ui.theme.Green500
import com.jmi.app.presentation.viewmodels.JobsViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AnalyticsScreen(
    onBackClick: () -> Unit,
    onOpenDrawer: () -> Unit,
    viewModel: JobsViewModel = hiltViewModel()
) {
    val topSkills by viewModel.topSkills.collectAsState()
    val topLocations by viewModel.topLocations.collectAsState()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Market Analytics") },
                navigationIcon = {
                    IconButton(onClick = onOpenDrawer) {
                        Icon(Icons.Default.Menu, contentDescription = "Menu", tint = MaterialTheme.colorScheme.onBackground)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.background,
                    titleContentColor = MaterialTheme.colorScheme.onBackground
                )
            )
        },
        containerColor = MaterialTheme.colorScheme.background
    ) { padding ->
        Column(
            modifier = Modifier
                .padding(padding)
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(16.dp)
        ) {
            Text(
                text = "Most In-Demand Skills",
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onBackground,
                modifier = Modifier.padding(bottom = 16.dp)
            )

            if (topSkills.isEmpty()) {
                CircularProgressIndicator(modifier = Modifier.align(Alignment.CenterHorizontally))
            } else {
                val maxSkillCount = topSkills.maxOfOrNull { it.second }?.toFloat() ?: 1f
                topSkills.forEach { (skill, count) ->
                    BarChartItem(label = skill, count = count, maxCount = maxSkillCount)
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            Text(
                text = "Top Hiring Locations",
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onBackground,
                modifier = Modifier.padding(bottom = 16.dp)
            )

            if (topLocations.isEmpty()) {
                CircularProgressIndicator(modifier = Modifier.align(Alignment.CenterHorizontally))
            } else {
                val maxLocCount = topLocations.maxOfOrNull { it.second }?.toFloat() ?: 1f
                topLocations.forEach { (location, count) ->
                    BarChartItem(label = location, count = count, maxCount = maxLocCount)
                }
            }
        }
    }
}

@Composable
fun BarChartItem(label: String, count: Int, maxCount: Float) {
    var isAnimatable by remember { mutableStateOf(false) }
    LaunchedEffect(Unit) { isAnimatable = true }

    val fraction by animateFloatAsState(
        targetValue = if (isAnimatable) (count / maxCount) else 0f,
        animationSpec = tween(durationMillis = 1000)
    )

    Column(modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(text = label, color = MaterialTheme.colorScheme.onBackground, fontSize = 14.sp)
            Text(text = count.toString(), color = MaterialTheme.colorScheme.onBackground, fontSize = 14.sp, fontWeight = FontWeight.Bold)
        }
        Spacer(modifier = Modifier.height(4.dp))
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(12.dp)
                .clip(RoundedCornerShape(6.dp))
                .background(MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Box(
                modifier = Modifier
                    .fillMaxWidth(fraction)
                    .fillMaxHeight()
                    .clip(RoundedCornerShape(6.dp))
                    .background(Green500)
            )
        }
    }
}
