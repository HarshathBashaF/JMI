import { MapPin, Briefcase, ExternalLink } from "lucide-react";

const JobCard = ({ job }) => {
  return (
    <div className="group relative p-5 rounded-2xl bg-gradient-to-br from-black to-gray-900 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">

      {/* 🔥 HEADER */}
      <div className="flex items-start justify-between">
        
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition">
            {job.title}
          </h3>

          <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
            <Briefcase size={14} /> {job.company}
          </p>
        </div>

        {/* DATE */}
        {job.date && (
          <span className="text-xs text-gray-500">
            {job.date}
          </span>
        )}
      </div>

      {/* 📍 LOCATION */}
      <div className="flex items-center gap-2 mt-3">
        <MapPin size={14} className="text-gray-500" />
        <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-md">
          {job.locations}
        </span>
      </div>

      {/* 📝 DESCRIPTION */}
      <p className="text-sm text-gray-400 mt-3 line-clamp-3 leading-relaxed">
        {job.description}
      </p>

      {/* 🔻 FOOTER */}
      <div className="flex items-center justify-between mt-5">

        {/* ✅ APPLY BUTTON (GREEN CTA) */}
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition shadow-md hover:shadow-green-500/30"
        >
          Apply
          <ExternalLink size={14} />
        </a>

        {/* 💰 SALARY */}
        {job.salary && (
          <span className="text-xs text-green-400 font-medium">
            {job.salary}
          </span>
        )}
      </div>

    </div>
  );
};

export default JobCard;