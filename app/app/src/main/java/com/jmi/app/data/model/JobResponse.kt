package com.jmi.app.data.model

import com.google.gson.annotations.SerializedName

data class JobResponse(
    @SerializedName("jobs")
    val jobs: List<Job>
)
