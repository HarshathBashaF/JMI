package com.jmi.app.data.api

import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

data class JobClickRequest(
    val job_id: String,
    val job_title: String
)

data class WebsiteVisitRequest(
    val ip_address: String,
    val city: String,
    val country: String,
    val browser: String
)

interface SupabaseApiService {
    @POST("rest/v1/job_clicks")
    suspend fun trackJobClick(
        @Header("apikey") apiKey: String,
        @Header("Authorization") authHeader: String,
        @Body request: JobClickRequest
    )

    @POST("rest/v1/website_visits")
    suspend fun trackWebsiteVisit(
        @Header("apikey") apiKey: String,
        @Header("Authorization") authHeader: String,
        @Body request: WebsiteVisitRequest
    )
}
