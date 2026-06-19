package com.jmi.app.data.api

import com.jmi.app.data.model.Job
import retrofit2.http.GET

interface JobApiService {
    @GET("jobs")
    suspend fun getJobs(): com.jmi.app.data.model.JobResponse
}
