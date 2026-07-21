import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle, XCircle, Upload } from "lucide-react";
import { useJobs } from "../context/JobContext";
import { parseSkillsFromText, getSkillsFromJobs } from "../utils/resumeUtils";
import * as pdfjsLib from 'pdfjs-dist/build/pdf.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
const Resume = () => {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const { jobs, loading } = useJobs();
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    setIsExtracting(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(" ");
        fullText += pageText + " ";
      }
      
      setResumeText(fullText);
    } catch (error) {
      console.error("Error parsing PDF:", error);
      alert("Failed to parse the PDF file.");
    } finally {
      setIsExtracting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleAnalyze = () => {
    if (!resumeText.trim()) return;

    // 1. Extract skills from the user's resume
    const userSkills = parseSkillsFromText(resumeText);

    // 2. Extract all skills found in the jobs database
    const apiSkills = getSkillsFromJobs(jobs);

    // 3. Compare them
    const matched = userSkills.filter(skill => apiSkills.includes(skill));
    const missing = apiSkills.filter(skill => !userSkills.includes(skill));

    setAnalysis({
      userSkills,
      matched,
      missing
    });
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto flex flex-col gap-8">
      {/* HEADER */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
          <FileText className="text-green-600" size={32} />
          Resume Analyzer
        </h1>
        <p className="text-slate-500">
          Paste your resume text below to compare your skills against currently available jobs in the market.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* INPUT SECTION */}
        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-700">Your Resume</h2>
            <div>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isExtracting}
                className="flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50"
              >
                <Upload size={16} />
                {isExtracting ? "Extracting..." : "Upload PDF"}
              </button>
            </div>
          </div>
          <textarea
            className="w-full h-80 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none bg-slate-50 text-slate-700"
            placeholder="Paste your resume text or upload a PDF..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            disabled={isExtracting}
          ></textarea>

          <button
            onClick={handleAnalyze}
            disabled={loading || !resumeText.trim()}
            className="mt-2 w-full py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-xl shadow-md hover:from-green-700 hover:to-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading Jobs Database..." : "Analyze Resume"}
          </button>
        </motion.div>

        {/* RESULTS SECTION */}
        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-slate-700">Analysis Results</h2>
          
          {!analysis ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
              <FileText size={48} className="opacity-20" />
              <p>Paste your resume and click analyze to see results.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6 overflow-y-auto max-h-[400px] pr-2">
              
              {/* MATCHING SKILLS */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-green-700 font-semibold border-b border-green-100 pb-2">
                  <CheckCircle size={20} />
                  <h3>Matching Skills ({analysis.matched.length})</h3>
                </div>
                {analysis.matched.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {analysis.matched.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200 capitalize">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No matching skills found.</p>
                )}
              </div>

              {/* MISSING SKILLS */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-rose-700 font-semibold border-b border-rose-100 pb-2">
                  <XCircle size={20} />
                  <h3>Missing Skills ({analysis.missing.length})</h3>
                </div>
                <p className="text-xs text-slate-400 -mt-1">Skills found in current job listings but missing from your resume.</p>
                {analysis.missing.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {analysis.missing.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-rose-50 text-rose-700 rounded-lg text-sm font-medium border border-rose-200 capitalize">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">You have all the required skills!</p>
                )}
              </div>

            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Resume;
