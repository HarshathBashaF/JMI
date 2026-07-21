package com.jmi.app.utils

import android.content.Context
import android.net.Uri
import com.jmi.app.data.model.Job
import java.io.InputStream
import com.tom_roush.pdfbox.pdmodel.PDDocument
import com.tom_roush.pdfbox.text.PDFTextStripper

object ResumeUtils {
    val KNOWN_SKILLS = listOf(
        "react", "angular", "vue", "next.js", "nuxt", "html", "css", "javascript", "typescript", "tailwind", "bootstrap",
        "node", "node.js", "express", "nestjs", "spring", "django", "flask", "laravel", "php", "ruby on rails",
        "java", "python", "c++", "c#", "go", "rust", "kotlin", "swift",
        "mysql", "postgresql", "mongodb", "redis", "firebase", "oracle",
        "aws", "azure", "gcp", "docker", "kubernetes", "jenkins", "github actions", "terraform",
        "git", "github", "gitlab", "jira", "figma", "postman",
        "ai", "machine learning", "deep learning", "data science", "pandas", "numpy", "tensorflow", "pytorch",
        "react native", "flutter", "android", "ios",
        "jest", "mocha", "cypress", "selenium",
        "rest api", "graphql", "microservices", "linux", "xml", "json", "seo"
    )

    fun parseSkillsFromText(text: String?): List<String> {
        if (text.isNullOrBlank()) return emptyList()
        val lowerText = text.lowercase()
        
        return KNOWN_SKILLS.filter { skill ->
            val escaped = Regex.escape(skill)
            val regex = Regex("(^|\\s|\\W)$escaped($|\\s|\\W)", RegexOption.IGNORE_CASE)
            regex.containsMatchIn(lowerText)
        }
    }

    fun getSkillsFromJobs(jobs: List<Job>): List<String> {
        val allSkills = mutableSetOf<String>()
        jobs.forEach { job ->
            val textToSearch = "${job.title.orEmpty()} ${job.description.orEmpty()}"
            val jobSkills = parseSkillsFromText(textToSearch)
            allSkills.addAll(jobSkills)
        }
        return allSkills.toList()
    }

    fun extractTextFromPdf(context: Context, uri: Uri): String {
        return try {
            context.contentResolver.openInputStream(uri)?.use { inputStream ->
                PDDocument.load(inputStream).use { document ->
                    val stripper = PDFTextStripper()
                    stripper.getText(document) ?: ""
                }
            } ?: ""
        } catch (e: Exception) {
            e.printStackTrace()
            ""
        }
    }
}
