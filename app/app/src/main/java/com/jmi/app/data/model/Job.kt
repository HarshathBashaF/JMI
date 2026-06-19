package com.jmi.app.data.model

import com.google.gson.annotations.SerializedName

data class Job(
    val id: String? = null,
    val title: String? = "Unknown Title",
    val company: String? = "Unknown Company",
    val date: String? = null,
    val locations: String? = null,
    val description: String? = null,
    val url: String? = null,
    val salary: String? = null
)
