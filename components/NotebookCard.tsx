import React from 'react';
import { PenTool } from 'lucide-react';
import { NotebookBlockData } from '../types';

interface NotebookCardProps {
  data: NotebookBlockData;
}

const NotebookCard: React.FC<NotebookCardProps> = ({ data }) => {
  return (
    <div className="my-6 border-l-4 border-yellow-400 bg-yellow-50 p-6 rounded-r-xl shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <PenTool size={64} className="text-yellow-600" />
      </div>
      
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-yellow-100 p-2 rounded-full text-yellow-700">
            <PenTool size={20} />
        </div>
        <h3 className="font-bold text-yellow-800 text-lg uppercase tracking-wide">
          Запишите в тетрадь
        </h3>
      </div>
      
      <div className="prose prose-yellow">
        <h4 className="font-bold text-slate-800 text-xl mb-2">{data.title}</h4>
        <ul className="space-y-2">
          {data.text.map((line, idx) => (
            <li key={idx} className="text-slate-700 font-medium leading-relaxed pl-2 border-l-2 border-yellow-200">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotebookCard;
