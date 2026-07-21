package com.jmi.app.presentation.ui.screens

import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Cancel
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.platform.LocalContext
import androidx.hilt.navigation.compose.hiltViewModel
import com.jmi.app.presentation.viewmodels.JobsUiState
import com.jmi.app.presentation.viewmodels.JobsViewModel
import com.jmi.app.utils.ResumeUtils
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import com.tom_roush.pdfbox.android.PDFBoxResourceLoader

@OptIn(ExperimentalMaterial3Api::class, ExperimentalLayoutApi::class)
@Composable
fun ResumeScreen(
    onOpenDrawer: () -> Unit,
    viewModel: JobsViewModel = hiltViewModel()
) {
    val context = LocalContext.current
    val uiState by viewModel.uiState.collectAsState()
    var resumeText by remember { mutableStateOf("") }
    
    var matchedSkills by remember { mutableStateOf<List<String>?>(null) }
    var missingSkills by remember { mutableStateOf<List<String>?>(null) }

    // PDF Picker
    val filePickerLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent()
    ) { uri: Uri? ->
        uri?.let {
            PDFBoxResourceLoader.init(context)
            val extractedText = ResumeUtils.extractTextFromPdf(context, it)
            if (extractedText.isNotBlank()) {
                resumeText = extractedText
            }
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Resume Analyzer") },
                navigationIcon = {
                    IconButton(onClick = onOpenDrawer) {
                        Icon(Icons.Default.Menu, contentDescription = "Menu")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surface,
                    titleContentColor = MaterialTheme.colorScheme.onSurface
                )
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp)
        ) {
            Text(
                text = "Upload your resume PDF or paste text below to analyze your skills.",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Button(
                onClick = { filePickerLauncher.launch("application/pdf") },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.secondaryContainer,
                    contentColor = MaterialTheme.colorScheme.onSecondaryContainer
                )
            ) {
                Text("Upload Resume (PDF)")
            }
            
            Spacer(modifier = Modifier.height(16.dp))
            
            OutlinedTextField(
                value = resumeText,
                onValueChange = { resumeText = it },
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f),
                placeholder = { Text("Paste your resume text here...") },
                shape = RoundedCornerShape(12.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    unfocusedContainerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.3f)
                )
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Button(
                onClick = {
                    if (uiState is JobsUiState.Success) {
                        val jobs = (uiState as JobsUiState.Success).jobs
                        val userSkills = ResumeUtils.parseSkillsFromText(resumeText)
                        val apiSkills = ResumeUtils.getSkillsFromJobs(jobs)
                        
                        matchedSkills = userSkills.filter { apiSkills.contains(it) }
                        missingSkills = apiSkills.filter { !userSkills.contains(it) }
                    }
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp),
                enabled = resumeText.isNotBlank() && uiState is JobsUiState.Success,
                shape = RoundedCornerShape(12.dp)
            ) {
                Text(
                    text = if (uiState is JobsUiState.Loading) "Loading Jobs..." else "Analyze Resume",
                    fontWeight = FontWeight.Bold
                )
            }

            if (matchedSkills != null && missingSkills != null) {
                Spacer(modifier = Modifier.height(16.dp))
                HorizontalDivider()
                Spacer(modifier = Modifier.height(16.dp))
                
                LazyColumn(
                    modifier = Modifier
                        .fillMaxWidth()
                        .weight(1f)
                ) {
                    item {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.CheckCircle, contentDescription = null, tint = Color(0xFF2E7D32), modifier = Modifier.size(20.dp))
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                "Matching Skills (${matchedSkills?.size ?: 0})", 
                                style = MaterialTheme.typography.titleMedium, 
                                color = Color(0xFF2E7D32)
                            )
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                        if (matchedSkills?.isNotEmpty() == true) {
                            FlowRow(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(8.dp),
                                verticalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                matchedSkills!!.forEach { skill ->
                                    SkillChip(skill, Color(0xFFE8F5E9), Color(0xFF2E7D32), Color(0xFFA5D6A7))
                                }
                            }
                        } else {
                            Text("No matching skills found.", fontSize = 14.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                        
                        Spacer(modifier = Modifier.height(24.dp))
                        
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Cancel, contentDescription = null, tint = Color(0xFFC62828), modifier = Modifier.size(20.dp))
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                "Missing Skills (${missingSkills?.size ?: 0})", 
                                style = MaterialTheme.typography.titleMedium, 
                                color = Color(0xFFC62828)
                            )
                        }
                        Text(
                            "Skills found in job listings but missing from your resume.", 
                            fontSize = 12.sp, 
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        if (missingSkills?.isNotEmpty() == true) {
                            FlowRow(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(8.dp),
                                verticalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                missingSkills!!.forEach { skill ->
                                    SkillChip(skill, Color(0xFFFFEBEE), Color(0xFFC62828), Color(0xFFEF9A9A))
                                }
                            }
                        } else {
                            Text("You have all the required skills!", fontSize = 14.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun SkillChip(skill: String, bgColor: Color, textColor: Color, borderColor: Color) {
    Box(
        modifier = Modifier
            .background(bgColor, RoundedCornerShape(8.dp))
            .border(1.dp, borderColor, RoundedCornerShape(8.dp))
            .padding(horizontal = 12.dp, vertical = 6.dp)
    ) {
        Text(
            text = skill.replaceFirstChar { if (it.isLowerCase()) it.titlecase(java.util.Locale.getDefault()) else it.toString() },
            color = textColor,
            fontSize = 14.sp,
            fontWeight = FontWeight.Medium
        )
    }
}
