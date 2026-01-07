import React, { useState } from 'react';
import { Download, Filter, ChevronDown, Calendar, Clock, MapPin } from 'lucide-react';
import { Course, DayOption } from '../types';
import { WEEK_DAYS, TIME_SLOTS, LEVEL_COLORS, LEVEL_TEXT_COLORS } from '../constants';
import { Button } from './Button';
import { CourseDetailModal } from './CourseDetailModal';

interface ScheduleProps {
  courses: Course[];
}

export const Schedule: React.FC<ScheduleProps> = ({ courses }) => {
  const [selectedDay, setSelectedDay] = useState<string>(WEEK_DAYS[0].value);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterLang, setFilterLang] = useState<string>('all');

  // Derive unique languages for filter
  const languages = Array.from(new Set(courses.map(c => c.language)));

  // ERROR F-03: Filter ignores selection
  const filteredCourses = courses; 
  // const filteredCourses = courses.filter(c => filterLang === 'all' || c.language === filterLang);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCourse(null), 200);
  };

  const handleExport = () => {
      // ERROR F-04: PDF Export creates empty result (simulated)
      alert("PDF wurde erstellt (0 KB)");
  };

  // Helper to get courses for a specific day and time slot
  const getCoursesForSlot = (day: string, timeStartPrefix: string) => {
    return filteredCourses.filter(c => {
      const startHour = c.startTime.split(':')[0];
      const slotHour = timeStartPrefix.split(':')[0];
      // Simple match for "8" vs "08" issues in mock data
      return c.dayOfWeek === day && parseInt(startHour) === parseInt(slotHour);
    });
  };
  
  // Helper to get all courses for a specific day (sorted by time)
  const getCoursesForDay = (day: string) => {
    return filteredCourses
      .filter(c => c.dayOfWeek === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Mein Stundenplan</h2>
          <p className="text-gray-500 text-sm">Woche vom 13.01. - 17.01.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Language Filter */}
          <div className="relative group">
            <select 
              className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:border-blue-400 transition-colors"
              value={filterLang}
              onChange={(e) => setFilterLang(e.target.value)}
            >
              <option value="all">Alle Sprachen</option>
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <Filter size={16} />
            </div>
          </div>

          <Button variant="secondary" className="flex items-center space-x-2" onClick={handleExport}>
            <Download size={18} />
            <span className="hidden sm:inline">Als PDF speichern</span>
          </Button>
        </div>
      </div>

      {/* --- Desktop View (Grid) --- */}
      {/* ERROR R-01: Layout breaks on tablets (768px). Grid cols are fixed in a way that overlaps on md screens */}
      <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="grid grid-cols-[100px_repeat(5,minmax(200px,1fr))] divide-x divide-gray-200">
          
          {/* Header Row */}
          <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-center font-bold text-gray-400 text-sm">
            <Clock size={16} className="mr-1" /> Zeit
          </div>
          {WEEK_DAYS.map(day => (
            <div key={day.value} className="bg-gray-50 p-4 border-b border-gray-200 text-center font-bold text-gray-700">
              {day.label}
            </div>
          ))}

          {/* Time Slots Rows */}
          {TIME_SLOTS.map(time => (
            <React.Fragment key={time}>
              {/* Time Column */}
              <div className="p-4 flex items-center justify-center text-sm font-medium text-gray-500 bg-gray-50/50 border-b border-gray-100 last:border-0">
                {time}
              </div>

              {/* Days Columns for this Time Slot */}
              {WEEK_DAYS.map(day => {
                const slotCourses = getCoursesForSlot(day.value, time);
                return (
                  <div key={`${day.value}-${time}`} className="min-h-[120px] p-2 border-b border-gray-100 last:border-0 relative bg-white hover:bg-gray-50/30 transition-colors">
                    {slotCourses.map(course => (
                      <div
                        key={course.courseId}
                        onClick={() => handleCourseClick(course)}
                        // ERROR A-04: When multiple courses overlap, they stack on top of each other (position absolute)
                        className={`p-3 rounded-lg shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200 border-l-4 ${slotCourses.length > 1 ? 'absolute top-2 left-2 right-2' : 'mb-2'}`}
                        style={{
                          backgroundColor: `${LEVEL_COLORS[course.level]}20`, // 20% opacity background
                          borderColor: LEVEL_COLORS[course.level]
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-bold text-sm text-gray-800">{course.courseName}</span>
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white"
                            style={{ backgroundColor: LEVEL_COLORS[course.level] }}
                          >
                            {course.level}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 mt-1 flex items-center">
                          <MapPin size={10} className="mr-1" /> {course.room}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {course.startTime} - {course.endTime}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* --- Mobile View (Day Tabs + Cards) --- */}
      {/* ERROR R-03: Forced minimum width causes horizontal scrolling on mobile */}
      <div className="md:hidden min-w-[500px]">
        
        {/* Day Selector Buttons */}
        <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide mb-2">
          {WEEK_DAYS.map(day => (
            <button
              key={day.value}
              onClick={() => setSelectedDay(day.value)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedDay === day.value
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {day.shortLabel}
            </button>
          ))}
        </div>

        {/* Course List for Selected Day */}
        <div className="space-y-3">
          {getCoursesForDay(selectedDay).length > 0 ? (
            getCoursesForDay(selectedDay).map(course => (
              <div 
                key={course.courseId}
                onClick={() => handleCourseClick(course)}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 active:scale-[0.98] transition-transform relative overflow-hidden"
              >
                {/* Colored strip on left */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-2"
                  style={{ backgroundColor: LEVEL_COLORS[course.level] }}
                />

                <div className="flex justify-between items-start pl-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{course.courseName}</h3>
                    <p className="text-sm text-gray-500 mb-2">{course.teacher}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1.5 text-blue-500" />
                        {course.startTime} - {course.endTime}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1.5 text-blue-500" />
                        {/* ERROR A-03: Room number cut off (truncated too aggressively) */}
                        <span className="w-12 truncate block">Raum {course.room}</span>
                      </div>
                    </div>
                  </div>

                  <span 
                    className="text-xs font-bold px-2 py-1 rounded-md"
                    style={{ 
                      backgroundColor: `${LEVEL_COLORS[course.level]}30`, // Light BG
                      color: LEVEL_TEXT_COLORS[course.level] === '#ffffff' ? 'black' : LEVEL_TEXT_COLORS[course.level] 
                    }}
                  >
                    {course.level}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">Keine Kurse für diesen Tag.</p>
              <p className="text-sm text-gray-400">Genießen Sie Ihre Freizeit!</p>
            </div>
          )}
        </div>
      </div>

      <CourseDetailModal 
        course={selectedCourse} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};