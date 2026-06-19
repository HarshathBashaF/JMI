package com.jmi.app.presentation.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.jmi.app.data.model.Job
import com.jmi.app.data.repository.JobRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

sealed class JobsUiState {
    object Loading : JobsUiState()
    data class Success(val jobs: List<Job>) : JobsUiState()
    data class Error(val message: String) : JobsUiState()
}

@HiltViewModel
class JobsViewModel @Inject constructor(
    private val repository: JobRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow<JobsUiState>(JobsUiState.Loading)
    val uiState: StateFlow<JobsUiState> = _uiState.asStateFlow()

    private val _topSkills = MutableStateFlow<List<Pair<String, Int>>>(emptyList())
    val topSkills: StateFlow<List<Pair<String, Int>>> = _topSkills.asStateFlow()

    private val _topLocations = MutableStateFlow<List<Pair<String, Int>>>(emptyList())
    val topLocations: StateFlow<List<Pair<String, Int>>> = _topLocations.asStateFlow()

    init {
        fetchJobs()
    }

    private fun fetchJobs() {
        viewModelScope.launch {
            _uiState.value = JobsUiState.Loading
            try {
                val jobsList = repository.getJobs()
                _uiState.value = JobsUiState.Success(jobsList)
                extractAnalytics(jobsList)
            } catch (e: Exception) {
                _uiState.value = JobsUiState.Error(e.message ?: "An unknown error occurred")
            }
        }
    }

    private fun extractAnalytics(jobs: List<Job>) {
        // Extract Skills
        val keywords = listOf("React", "Node.js", "Python", "Java", "Kotlin", "AWS", "SQL", "Docker", "Angular", "Vue", "Spring", "C++", "C#")
        val skillCounts = mutableMapOf<String, Int>()
        
        jobs.forEach { job ->
            val textToSearch = "${job.title.orEmpty()} ${job.description.orEmpty()}".lowercase()
            keywords.forEach { skill ->
                if (textToSearch.contains(skill.lowercase())) {
                    skillCounts[skill] = skillCounts.getOrDefault(skill, 0) + 1
                }
            }
        }
        _topSkills.value = skillCounts.toList().sortedByDescending { it.second }.take(10)

        // Extract Locations
        val locationCounts = mutableMapOf<String, Int>()
        jobs.forEach { job ->
            val loc = job.locations
            if (!loc.isNullOrBlank()) {
                val city = loc.split(",").first().trim() // e.g., "Hyderabad, Telangana" -> "Hyderabad"
                if (city.isNotEmpty() && city.lowercase() != "unknown") {
                    locationCounts[city] = locationCounts.getOrDefault(city, 0) + 1
                }
            }
        }
        _topLocations.value = locationCounts.toList().sortedByDescending { it.second }.take(10)
    }

    fun onApplyClicked(job: Job) {
        viewModelScope.launch {
            try {
                repository.trackJobClick(jobId = job.id ?: java.util.UUID.randomUUID().toString(), jobTitle = job.title ?: "Unknown")
            } catch (e: Exception) {
                // Silently fail tracking just like the web app
            }
        }
    }
}
