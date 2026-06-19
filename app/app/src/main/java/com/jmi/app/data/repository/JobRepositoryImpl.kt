package com.jmi.app.data.repository

import com.jmi.app.data.api.JobApiService
import com.jmi.app.data.api.JobClickRequest
import com.jmi.app.data.api.SupabaseApiService
import com.jmi.app.data.api.WebsiteVisitRequest
import com.jmi.app.data.model.Job
import javax.inject.Inject

class JobRepositoryImpl @Inject constructor(
    private val jobApi: JobApiService,
    private val supabaseApi: SupabaseApiService
) : JobRepository {

    // Supabase Credentials
    private val anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxueXdvc3l2aGJ5dGRua21kbmJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3NDQ5ODMsImV4cCI6MjA5NzMyMDk4M30.deTux272pJEpm7-N9Q1cnOI9hnEjrZLoiAMcdczi-3A"
    private val bearerToken = "Bearer $anonKey"

    override suspend fun getJobs(): List<Job> {
        return jobApi.getJobs().jobs
    }

    override suspend fun trackJobClick(jobId: String, jobTitle: String) {
        val request = JobClickRequest(job_id = jobId, job_title = jobTitle)
        supabaseApi.trackJobClick(apiKey = anonKey, authHeader = bearerToken, request = request)
    }

    override suspend fun trackWebsiteVisit(ip: String, city: String, country: String, browser: String) {
        val request = WebsiteVisitRequest(ip_address = ip, city = city, country = country, browser = browser)
        supabaseApi.trackWebsiteVisit(apiKey = anonKey, authHeader = bearerToken, request = request)
    }
}
