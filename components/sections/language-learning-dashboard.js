'use client';
import { 
  BookOpen, 
  Clock, 
  Star, 
  PlayCircle, 
  FileText, 
  BrainCircuit,
  Calendar,
  BarChart,
  CheckCircle 
} from 'lucide-react';
import styles from '../../scss/LanguageLearningDashboard.module.scss';
import { useState, useEffect } from 'react';
import VideoModal from '../modals/VideoModal';
import TriviaModal from '../modals/TriviaModal';

const getDifficultyClass = (difficulty) => {
  switch (difficulty) {
    case 'Beginner':
      return styles.badgeBeginner;
    case 'Intermediate':
      return styles.badgeIntermediate;
    case 'Advanced':
      return styles.badgeAdvanced;
    default:
      return '';
  }
};

const getLanguageClass = (language) => {
  switch (language) {
    case 'Somali':
      return styles.badgeSomali;
    case 'Amharic':
      return styles.badgeAmharic;
    case 'Afaan Oromo':
      return styles.badgeAfaanOromo;
    case 'Tigrigna':
      return styles.badgeTigrigna;
    case 'Swahili':
      return styles.badgeSwahili;
    default:
      return styles.badgeMixed;
  }
};

export default function LanguageLearningDashboard() {
  const [videoModal, setVideoModal] = useState({ isOpen: false, url: '', title: '' });
  const [triviaModal, setTriviaModal] = useState({ isOpen: false, questions: [], title: '', outlineId: null });
  const [courseTitle, setCourseTitle] = useState('Loading...');
  const [courseWeeks, setCourseWeeks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState({}); // { [outlineId]: true/false }

  useEffect(() => {
    const fetchCourseData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        //fetch the course ID
        const courseRes = await fetch('https://api.tmero.com/user/courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const courseData = await courseRes.json();

        if (!courseRes.ok || !courseData?.data?.length) {
          console.error('Failed to fetch courses');
          return;
        }

        const course = courseData.data[0];
        setCourseTitle(course.title);

        //fetch the course outlines
        const outlineRes = await fetch(`https://api.tmero.com/user/courses/${course.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const outlineData = await outlineRes.json();

        if (!outlineRes.ok || !outlineData?.data?.length) {
          console.error('Failed to fetch outlines');
          return;
        }

        const outlines = outlineData.data[0].outlines;

        
        let progressObj = {};
        try {
          const res = await fetch('https://api.tmero.com/courseprogress', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          });
          const data = await res.json();
          console.log('GET /courseprogress response', data);
          if (res.ok && data.data) {
            if (Array.isArray(data.data)) {
              data.data.forEach(item => {
                if (
                  item &&
                  (item.seen === 1 || item.seen === true) &&
                  item.courseOutline &&
                  item.courseOutline.id
                ) {
                  progressObj[item.courseOutline.id] = true;
                }
              });
            } else if (typeof data.data === 'object') {
              if (
                (data.data.seen === 1 || data.data.seen === true) &&
                data.data.courseOutline &&
                data.data.courseOutline.id
              ) {
                progressObj[data.data.courseOutline.id] = true;
              }
            }
          }
        } catch (err) {
          console.error('Error fetching progress', err);
        }

        const formattedWeeks = outlines.map((outline) => ({
          week: outline.order,
          title: outline.outline,
          description: `Learn ${outline.outline.toLowerCase()} in ${course.title}`,
          tasks: [{
            id: outline.id,
            title: outline.outline,
            description: `Master ${outline.outline.toLowerCase()} in ${course.title}`,
            duration: '25 min',
            difficulty: outline.order <= 10 ? 'Beginner' : 
                       outline.order <= 14 ? 'Intermediate' : 'Advanced',
            completed: progressObj[outline.id] || false,
            language: course.title,
            hasVideo: true,
            hasWorksheet: true,
            videoUrl: outline.youtubeUrl,
            trivia: outline.trivia || []
          }]
        }));

        setProgress(progressObj);
        setCourseWeeks(formattedWeeks);
      } catch (err) {
        console.error('Error fetching course data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, []);

  const markOutlineComplete = async (outlineId) => {
    console.log('markOutlineComplete called with outlineId:', outlineId);
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch('https://api.tmero.com/courseprogress', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: Number(outlineId), status: true }),
      });
      console.log('POST /courseprogress for outline', outlineId, 'status:', res.status);
      const data = await res.json();
      console.log('POST /courseprogress response for outline', outlineId, data);
      setProgress((prev) => ({ ...prev, [outlineId]: true }));
      setCourseWeeks((prevWeeks) => prevWeeks.map(week => ({
        ...week,
        tasks: week.tasks.map(task =>
          task.id === outlineId ? { ...task, completed: true } : task
        )
      })));
    } catch (err) {
      console.error('Failed to mark progress:', err);
    }
  };

  const handleWatchLesson = (taskId, taskTitle) => {
    const task = courseWeeks
      .flatMap(week => week.tasks)
      .find(task => task.id === taskId);

    if (task && task.videoUrl) {
      setVideoModal({ isOpen: true, url: task.videoUrl, title: taskTitle });
    } else {
      console.error('Video URL not found for task:', taskId);
    }
  };

  const handleTakeTrivia = (taskId, taskTitle) => {
    console.log('handleTakeTrivia called for taskId:', taskId, 'taskTitle:', taskTitle);
    const task = courseWeeks
      .flatMap(week => week.tasks)
      .find(task => task.id === taskId);

    if (task && task.trivia && task.trivia.length > 0) {
      console.log('Opening trivia modal for outlineId:', task.id);
      setTriviaModal({ 
        isOpen: true, 
        questions: task.trivia,
        title: `${taskTitle} - Trivia Quiz`,
        outlineId: task.id
      });
    } else {
      //if no trivia questions are available yet
      console.log('No trivia questions available for this lesson yet');
      alert('Trivia questions for this lesson will be available soon!');
    }
  };

const handleDownloadPDF = (taskId, taskTitle) => {
  const task = courseWeeks
    .flatMap((week) => week.tasks)
    .find((task) => task.id === taskId);

  if (!task) {
    console.error('Task not found');
    return;
  }

  const courseTitle = task.language.toLowerCase();
  let pdfUrl = '';

  switch (courseTitle) {
    case 'afaan oromo':
      pdfUrl = 'https://www.dropbox.com/scl/fo/19x5rve1wvi59x6y36z9v/ADZjA9aSQdT0dk5aYNVBNyk?rlkey=mt1yacjotxq74pq7xr100tc12&st=z959i69s&dl=0';
      break;
    case 'amharic':
      pdfUrl = 'https://www.dropbox.com/scl/fo/1b6zsgxgfo4mf2kr5sgx0/AGa8FWLuF5_ZigG8rOt-VUI?rlkey=3modjgpdp6shcjrmm5lpycfwr&st=elv33c4z&dl=0';
      break;
    case 'somali':
      pdfUrl = 'https://www.dropbox.com/scl/fo/kbi21gc8te12o8fm76jcm/AAMgjL0TPDClW9CRrz-rNtg?rlkey=rrbzqsla01u3ieqxfmhi02qs4&st=oj1nm869&dl=0';
      break;
    case 'swahili':
      pdfUrl = 'https://www.dropbox.com/scl/fo/f867on0edq7ohlvrd0807/AGxcnxyZs7BqRm9T5HgP77A?rlkey=yddrkc6wxhc82ihnovhmwz5xo&st=okbvf46c&dl=0';
      break;
    case 'tigrigna':
      pdfUrl = 'https://www.dropbox.com/scl/fo/49xjj6szlxbyq5go7pqrm/AB_9q-ovNIQIIENKI2xP0tU?rlkey=79ohy605tk60ct8ufrequgkuj&st=3uaxi4i6&dl=0';
      break;
    default:
      alert('No resource is available for this course yet.');
      return;
  }

  window.open(pdfUrl, '_blank');
};


  const completedTasks = courseWeeks.reduce(
    (total, week) => total + week.tasks.filter((task) => task.completed).length,
    0
  );

  const totalTasks = courseWeeks.reduce((total, week) => total + week.tasks.length, 0);
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  if (isLoading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading your course...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>{courseTitle} Language Course</h1>
        <p className={styles.dashboardSubtitle}>
          Join our exciting adventure to learn {courseTitle} through fun activities and games!
        </p>
        
        <div className={styles.progressOverview}>
          <div className={styles.progressCard}>
            <div className={styles.progressIcon}>
              <CheckCircle size={24} />
            </div>
            <div className={styles.progressInfo}>
              <span className={styles.progressLabel}>Completed Lessons</span>
              <span className={styles.progressValue}>{completedTasks}/{totalTasks}</span>
            </div>
          </div>
          
          <div className={styles.progressCard}>
            <div className={styles.progressIcon}>
              <BarChart size={24} />
            </div>
            <div className={styles.progressInfo}>
              <span className={styles.progressLabel}>Progress</span>
              <span className={styles.progressValue}>{completionPercentage}%</span>
            </div>
          </div>
          
          <div className={styles.progressCard}>
            <div className={styles.progressIcon}>
              <Calendar size={24} />
            </div>
            <div className={styles.progressInfo}>
              <span className={styles.progressLabel}>Course Length</span>
              <span className={styles.progressValue}>{courseWeeks.length} weeks</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.courseGrid}>
        {courseWeeks.map((weekData) => (
          <div key={weekData.week} className={styles.weekCard}>
            <div className={styles.weekHeader}>
              <h2>Week {weekData.week}</h2>
              <h3>{weekData.title}</h3>
              <p>{weekData.description}</p>
            </div>
            <div className={styles.taskList}>
              {weekData.tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`${styles.task} ${task.completed ? styles.completed : ''}`}
                >
                  <div className={styles.taskHeader}>
                    <h3 className={styles.taskTitle}>
                      {task.title}
                      {task.completed && <CheckCircle size={16} className={styles.completedIcon} />}
                    </h3>
                  </div>
                  <p className={styles.taskDescription}>{task.description}</p>
                  <div className={styles.taskMeta}>
                    <span className={getDifficultyClass(task.difficulty)}>
                      <Star size={12} />
                      {task.difficulty}
                    </span>
                    <span className={getLanguageClass(task.language)}>
                      <BookOpen size={12} />
                      {task.language}
                    </span>
                    <span className={styles.duration}>
                      <Clock size={12} className={styles.icon} />
                      {task.duration}
                    </span>
                  </div>
                  <div className={styles.taskActions}>
                    <button 
                      className={`${styles.actionButton} ${styles.watchButton}`}
                      onClick={() => handleWatchLesson(task.id, task.title)}
                    >
                      <PlayCircle size={16} />
                      Watch Lesson
                    </button>
                    <button 
                      className={`${styles.actionButton} ${styles.triviaButton}`}
                      onClick={() => handleTakeTrivia(task.id, task.title)}
                    >
                      <BrainCircuit size={16} />
                      Take Trivia
                    </button>
                    <button 
                      className={`${styles.actionButton} ${styles.downloadButton}`}
                      onClick={() => handleDownloadPDF(task.id, task.title)}
                    >
                      <FileText size={16} />
                      Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <VideoModal 
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ isOpen: false, url: '', title: '' })}
        videoUrl={videoModal.url}
        title={videoModal.title}
      />

      <TriviaModal 
        isOpen={triviaModal.isOpen}
        onClose={() => setTriviaModal({ isOpen: false, questions: [], title: '', outlineId: null })}
        questions={triviaModal.questions}
        title={triviaModal.title}
        onComplete={() => {
          console.log('TriviaModal onComplete triggered for outlineId:', triviaModal.outlineId);
          if (triviaModal.outlineId) markOutlineComplete(triviaModal.outlineId);
        }}
      />
    </div>
  );
}
