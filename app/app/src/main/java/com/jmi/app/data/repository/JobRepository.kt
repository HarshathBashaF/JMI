package com.jmi.app.data.repository

import com.jmi.app.data.model.Job

interface JobRepository {
    suspend fun getJobs(): List<Job>
    suspend fun trackJobClick(jobId: String, jobTitle: String)
    suspend fun trackWebsiteVisit(ip: String, city: String, country: String, browser: String)
}
