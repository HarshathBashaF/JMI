package com.jmi.app.presentation.navigation

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.jmi.app.presentation.ui.screens.AnalyticsScreen
import com.jmi.app.presentation.ui.screens.DashboardScreen
import com.jmi.app.presentation.ui.screens.HomeScreen
import com.jmi.app.presentation.ui.screens.JobsScreen
import kotlinx.coroutines.launch

object Routes {
    const val HOME = "home"
    const val DASHBOARD = "dashboard"
    const val JOBS = "jobs"
    const val ANALYTICS = "analytics"
}

@Composable
fun AppNavigation(
    isDarkTheme: Boolean,
    onThemeToggle: () -> Unit,
    navController: NavHostController = rememberNavController()
) {
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    val scope = rememberCoroutineScope()
    val navBackStackEntry = navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry.value?.destination?.route

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet {
                Spacer(Modifier.height(24.dp))
                Text(
                    text = "JMI Menu",
                    fontSize = 24.sp,
                    color = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.padding(16.dp)
                )
                Divider()
                
                DrawerItem("Home", Icons.Default.Home, currentRoute == Routes.HOME) {
                    navController.navigate(Routes.HOME) { popUpTo(0) }
                    scope.launch { drawerState.close() }
                }
                DrawerItem("Dashboard", Icons.Default.Dashboard, currentRoute == Routes.DASHBOARD) {
                    navController.navigate(Routes.DASHBOARD) { popUpTo(0) }
                    scope.launch { drawerState.close() }
                }
                DrawerItem("Jobs", Icons.Default.Work, currentRoute == Routes.JOBS) {
                    navController.navigate(Routes.JOBS) { popUpTo(0) }
                    scope.launch { drawerState.close() }
                }
                DrawerItem("Analytics", Icons.Default.Analytics, currentRoute == Routes.ANALYTICS) {
                    navController.navigate(Routes.ANALYTICS) { popUpTo(0) }
                    scope.launch { drawerState.close() }
                }

                Spacer(Modifier.weight(1f))
                Divider()
                // Theme Toggle
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("Dark Mode", color = MaterialTheme.colorScheme.onSurface)
                    Switch(
                        checked = isDarkTheme,
                        onCheckedChange = { onThemeToggle() }
                    )
                }
                Spacer(Modifier.height(24.dp))
            }
        }
    ) {
        val onOpenDrawer: () -> Unit = { scope.launch { drawerState.open() } }

        NavHost(
            navController = navController,
            startDestination = Routes.HOME
        ) {
            composable(Routes.HOME) {
                HomeScreen(
                    onNavigateToDashboard = {
                        navController.navigate(Routes.DASHBOARD) { popUpTo(Routes.HOME) { inclusive = true } }
                    },
                    onOpenDrawer = onOpenDrawer
                )
            }
            composable(Routes.DASHBOARD) {
                DashboardScreen(
                    onNavigateToJobs = { navController.navigate(Routes.JOBS) },
                    onNavigateToAnalytics = { navController.navigate(Routes.ANALYTICS) },
                    onOpenDrawer = onOpenDrawer
                )
            }
            composable(Routes.JOBS) {
                JobsScreen(
                    onBackClick = { navController.popBackStack() },
                    onOpenDrawer = onOpenDrawer
                )
            }
            composable(Routes.ANALYTICS) {
                AnalyticsScreen(
                    onBackClick = { navController.popBackStack() },
                    onOpenDrawer = onOpenDrawer
                )
            }
        }
    }
}

@Composable
fun DrawerItem(title: String, icon: ImageVector, selected: Boolean, onClick: () -> Unit) {
    NavigationDrawerItem(
        label = { Text(title) },
        selected = selected,
        onClick = onClick,
        icon = { Icon(icon, contentDescription = null) },
        modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp)
    )
}
