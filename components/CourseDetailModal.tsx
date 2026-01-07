import React from 'react';
import { X, MapPin, User as UserIcon, Clock, BookOpen } from 'lucide-react';
import { Course } from '../types';
import { LEVEL_COLORS } from '../constants';

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ course, isOpen, onClose }) => {
  if (!isOpen || !course) return null;

  const levelColor = LEVEL_COLORS[course.level];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Kursdetails</h2>
          {/* ERROR A-05: Button doesn't close modal (removed onClick functionality) */}
          {/* ERROR R-02: Button is too small (w-4 h-4, no padding) - way below 44px touch target */}
          <button
            onClick={() => { console.log("Close clicked but ignored (Bug A-05)"); }}
            className="w-4 h-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
          >
            <X size={10} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Main Badge */}
          <div className="flex items-center space-x-4">
            <div 
              className="w-16 h-16 rounded-lg flex items-center justify-center text-xl font-bold shadow-sm"
              style={{ backgroundColor: levelColor, color: '#fff' }}
            >
              {course.level}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{course.courseName}</h3>
              <p className="text-gray-500">{course.language}</p>
            </div>
          </div>

          {/* Details List */}
          <div className="space-y-4">
            <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
              <MapPin className="w-5 h-5 mr-3 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">Raum</p>
                <p className="font-medium">{course.room}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
              <UserIcon className="w-5 h-5 mr-3 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">Lehrkraft</p>
                {/* ERROR F-05: Wrong teacher always displayed */}
                <p className="font-medium">Sarah Miller</p>
              </div>
            </div>

            <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
              <Clock className="w-5 h-5 mr-3 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">Zeit</p>
                <p className="font-medium">{course.dayOfWeek}, {course.startTime} - {course.endTime}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
              <BookOpen className="w-5 h-5 mr-3 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">Niveau</p>
                <p className="font-medium">{course.level}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          {/* ERROR R-02: Button too small on mobile (px-2 py-1 text-xs) */}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};