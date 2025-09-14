// Gamification System for AlFoxAI Learning Platform
// Motivates users with points, badges, and levels

class GamificationSystem {
    constructor() {
        this.userData = this.loadUserData();
        this.badges = this.initializeBadges();
        this.levels = this.initializeLevels();
    }

    // Initialize user data from localStorage
    loadUserData() {
        const defaultData = {
            totalPoints: 0,
            currentLevel: 1,
            badges: [],
            quizzesCompleted: 0,
            lessonsCompleted: 0,
            streak: 0,
            lastActivity: null,
            achievements: [],
            completedQuizzes: [] // Track which quizzes have been completed for points
        };

        const savedData = localStorage.getItem('alfoxai_user_data');
        return savedData ? { ...defaultData, ...JSON.parse(savedData) } : defaultData;
    }

    // Save user data to localStorage
    saveUserData() {
        localStorage.setItem('alfoxai_user_data', JSON.stringify(this.userData));
    }

    // Initialize badge system
    initializeBadges() {
        return {
            'first_quiz': {
                id: 'first_quiz',
                name: 'أول اختبار',
                nameEn: 'First Quiz',
                description: 'أكمل أول اختبار بنجاح',
                descriptionEn: 'Complete your first quiz successfully',
                icon: '🎯',
                pointsRequired: 0,
                condition: 'quiz_completed'
            },
            'perfect_score': {
                id: 'perfect_score',
                name: 'النتيجة المثالية',
                nameEn: 'Perfect Score',
                description: 'احصل على نتيجة مثالية في الاختبار',
                descriptionEn: 'Get a perfect score on a quiz',
                icon: '⭐',
                pointsRequired: 0,
                condition: 'perfect_quiz'
            },
            'quick_learner': {
                id: 'quick_learner',
                name: 'المتعلم السريع',
                nameEn: 'Quick Learner',
                description: 'أكمل 3 دروس في أقل من ساعة',
                descriptionEn: 'Complete 3 lessons in less than an hour',
                icon: '⚡',
                pointsRequired: 0,
                condition: 'fast_learning'
            },
            'dedicated_student': {
                id: 'dedicated_student',
                name: 'الطالب المتفاني',
                nameEn: 'Dedicated Student',
                description: 'أكمل 5 اختبارات',
                descriptionEn: 'Complete 5 quizzes',
                icon: '📚',
                pointsRequired: 0,
                condition: 'quizzes_5'
            },
            'ai_expert': {
                id: 'ai_expert',
                name: 'خبير الذكاء الاصطناعي',
                nameEn: 'AI Expert',
                description: 'احصل على 100 نقطة',
                descriptionEn: 'Earn 100 points',
                icon: '🤖',
                pointsRequired: 100,
                condition: 'points_100'
            },
            'master_learner': {
                id: 'master_learner',
                name: 'سيد التعلم',
                nameEn: 'Master Learner',
                description: 'أكمل 10 اختبارات',
                descriptionEn: 'Complete 10 quizzes',
                icon: '👑',
                pointsRequired: 0,
                condition: 'quizzes_10'
            }
        };
    }

    // Initialize level system
    initializeLevels() {
        return [
            { level: 1, name: 'مبتدئ', nameEn: 'Beginner', pointsRequired: 0, color: '#4CAF50', icon: '🌱' },
            { level: 2, name: 'متقدم', nameEn: 'Advanced', pointsRequired: 50, color: '#2196F3', icon: '📈' },
            { level: 3, name: 'خبير', nameEn: 'Expert', pointsRequired: 150, color: '#FF9800', icon: '🎓' },
            { level: 4, name: 'أستاذ', nameEn: 'Master', pointsRequired: 300, color: '#9C27B0', icon: '👨‍🏫' },
            { level: 5, name: 'أسطورة', nameEn: 'Legend', pointsRequired: 500, color: '#F44336', icon: '🏆' }
        ];
    }

    // Calculate points for quiz completion
    calculateQuizPoints(score, totalQuestions, timeSpent) {
        let basePoints = Math.floor((score / totalQuestions) * 50); // Base points based on score
        
        // Bonus for perfect score
        if (score === totalQuestions) {
            basePoints += 25;
        }
        
        // Bonus for quick completion (less than 5 minutes)
        if (timeSpent < 300) { // 5 minutes in seconds
            basePoints += 15;
        }
        
        // Bonus for first quiz
        if (this.userData.quizzesCompleted === 0) {
            basePoints += 20;
        }
        
        return Math.max(basePoints, 10); // Minimum 10 points
    }

    // Award points and check for level up
    awardPoints(points, source = 'quiz') {
        const oldLevel = this.getCurrentLevel();
        this.userData.totalPoints += points;
        
        // Update activity tracking
        this.userData.lastActivity = new Date().toISOString();
        
        const newLevel = this.getCurrentLevel();
        const leveledUp = newLevel > oldLevel;
        
        // Check for new badges
        const newBadges = this.checkForNewBadges(source);
        
        this.saveUserData();
        
        return {
            pointsAwarded: points,
            totalPoints: this.userData.totalPoints,
            leveledUp: leveledUp,
            oldLevel: oldLevel,
            newLevel: newLevel,
            newBadges: newBadges
        };
    }

    // Get current level based on points
    getCurrentLevel() {
        for (let i = this.levels.length - 1; i >= 0; i--) {
            if (this.userData.totalPoints >= this.levels[i].pointsRequired) {
                return this.levels[i].level;
            }
        }
        return 1;
    }

    // Get level info
    getLevelInfo(level) {
        return this.levels.find(l => l.level === level) || this.levels[0];
    }

    // Check for new badges
    checkForNewBadges(source) {
        const newBadges = [];
        
        // Check each badge condition
        Object.values(this.badges).forEach(badge => {
            if (this.userData.badges.includes(badge.id)) return; // Already earned
            
            let shouldAward = false;
            
            switch (badge.condition) {
                case 'quiz_completed':
                    shouldAward = this.userData.quizzesCompleted >= 1;
                    break;
                case 'perfect_quiz':
                    shouldAward = source === 'perfect_quiz';
                    break;
                case 'quizzes_5':
                    shouldAward = this.userData.quizzesCompleted >= 5;
                    break;
                case 'quizzes_10':
                    shouldAward = this.userData.quizzesCompleted >= 10;
                    break;
                case 'points_100':
                    shouldAward = this.userData.totalPoints >= 100;
                    break;
            }
            
            if (shouldAward) {
                this.userData.badges.push(badge.id);
                newBadges.push(badge);
            }
        });
        
        return newBadges;
    }

    // Complete quiz
    completeQuiz(score, totalQuestions, timeSpent, quizId = 'quiz1') {
        // Check if this quiz has already been completed for points
        const alreadyCompleted = this.userData.completedQuizzes.includes(quizId);
        
        // Always increment quiz count for statistics
        this.userData.quizzesCompleted++;
        
        let result;
        
        if (alreadyCompleted) {
            // Quiz already completed - no points awarded
            console.log(`Quiz ${quizId} already completed - no points awarded`);
            result = {
                pointsAwarded: 0,
                totalPoints: this.userData.totalPoints,
                leveledUp: false,
                oldLevel: this.getCurrentLevel(),
                newLevel: this.getCurrentLevel(),
                newBadges: [],
                alreadyCompleted: true
            };
        } else {
            // First time completing this quiz - award points
            const points = this.calculateQuizPoints(score, totalQuestions, timeSpent);
            const isPerfectScore = score === totalQuestions;
            
            result = this.awardPoints(points, isPerfectScore ? 'perfect_quiz' : 'quiz');
            
            // Mark this quiz as completed for points
            this.userData.completedQuizzes.push(quizId);
            result.alreadyCompleted = false;
        }
        
        this.saveUserData();
        return result;
    }

    // Complete lesson (no points awarded)
    completeLesson() {
        this.userData.lessonsCompleted++;
        // No points awarded for lesson completion - only for quiz completion
        this.saveUserData();
        return { pointsAwarded: 0, totalPoints: this.userData.totalPoints };
    }

    // Show motivational popup (deprecated - now using results page)
    showMotivationPopup(result) {
        // This function is kept for backward compatibility but does nothing
        // Results are now shown on a dedicated results page
        console.log('Popup functionality moved to results page');
    }

    // Generate popup HTML
    generatePopupHTML(result) {
        const levelInfo = this.getLevelInfo(result.newLevel);
        const nextLevel = this.levels.find(l => l.level === result.newLevel + 1);
        const pointsToNext = nextLevel ? nextLevel.pointsRequired - result.totalPoints : 0;
        
        let badgesHTML = '';
        if (result.newBadges.length > 0) {
            badgesHTML = `
                <div class="new-badges">
                    <h4>🏆 شارات جديدة!</h4>
                    ${result.newBadges.map(badge => `
                        <div class="badge-item">
                            <span class="badge-icon">${badge.icon}</span>
                            <div class="badge-info">
                                <strong>${badge.name}</strong>
                                <p>${badge.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        let levelUpHTML = '';
        if (result.leveledUp) {
            levelUpHTML = `
                <div class="level-up">
                    <h3>🎉 ترقية مستوى!</h3>
                    <div class="level-display">
                        <span class="old-level">المستوى ${result.oldLevel}</span>
                        <span class="arrow">→</span>
                        <span class="new-level" style="color: ${levelInfo.color}">
                            ${levelInfo.icon} المستوى ${result.newLevel} - ${levelInfo.name}
                        </span>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="popup-content">
                <div class="popup-header">
                    <h2>🎊 ممتاز!</h2>
                    <button class="close-popup" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
                </div>
                
                <div class="points-earned">
                    <div class="points-display">
                        <span class="points-icon">⭐</span>
                        <span class="points-text">+${result.pointsAwarded} نقطة</span>
                    </div>
                    <div class="total-points">
                        إجمالي النقاط: <strong>${result.totalPoints}</strong>
                    </div>
                </div>
                
                ${levelUpHTML}
                
                ${badgesHTML}
                
                <div class="progress-info">
                    <div class="current-level">
                        <span class="level-icon" style="color: ${levelInfo.color}">${levelInfo.icon}</span>
                        <span class="level-name">${levelInfo.name}</span>
                    </div>
                    ${nextLevel ? `
                        <div class="next-level-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${Math.min(100, (result.totalPoints / nextLevel.pointsRequired) * 100)}%"></div>
                            </div>
                            <p>${pointsToNext} نقطة للوصول للمستوى ${nextLevel.level}</p>
                        </div>
                    ` : '<p class="max-level">🎉 وصلت لأعلى مستوى!</p>'}
                </div>
                
                <div class="popup-actions">
                    <button class="btn-continue" onclick="this.parentElement.parentElement.parentElement.remove()">
                        متابعة التعلم
                    </button>
                </div>
            </div>
        `;
    }

    // Get user stats
    getUserStats() {
        return {
            totalPoints: this.userData.totalPoints,
            currentLevel: this.getCurrentLevel(),
            levelInfo: this.getLevelInfo(this.getCurrentLevel()),
            badges: this.userData.badges.map(id => this.badges[id]),
            quizzesCompleted: this.userData.quizzesCompleted,
            lessonsCompleted: this.userData.lessonsCompleted,
            streak: this.userData.streak
        };
    }

    // Reset user data (for testing)
    resetUserData() {
        localStorage.removeItem('alfoxai_user_data');
        this.userData = this.loadUserData();
    }
    
    // Reset specific quiz completion (for testing)
    resetQuizCompletion(quizId) {
        this.userData.completedQuizzes = this.userData.completedQuizzes.filter(id => id !== quizId);
        this.saveUserData();
        console.log(`Quiz ${quizId} completion reset`);
    }
    
    // Get completion status for a quiz
    isQuizCompleted(quizId) {
        return this.userData.completedQuizzes.includes(quizId);
    }
}

// CSS for motivation popup
const motivationCSS = `
<style>
.motivation-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.motivation-popup.show {
    opacity: 1;
}

.popup-content {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    padding: 30px;
    max-width: 500px;
    width: 90%;
    color: white;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    transform: scale(0.8);
    transition: transform 0.3s ease;
}

.motivation-popup.show .popup-content {
    transform: scale(1);
}

.popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.popup-header h2 {
    margin: 0;
    font-size: 2em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.close-popup {
    background: none;
    border: none;
    color: white;
    font-size: 2em;
    cursor: pointer;
    padding: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;
}

.close-popup:hover {
    background: rgba(255, 255, 255, 0.2);
}

.points-earned {
    margin: 20px 0;
}

.points-display {
    font-size: 2.5em;
    font-weight: bold;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.points-icon {
    margin-right: 10px;
}

.total-points {
    font-size: 1.2em;
    opacity: 0.9;
}

.level-up {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 20px;
    margin: 20px 0;
}

.level-up h3 {
    margin: 0 0 15px 0;
    font-size: 1.5em;
}

.level-display {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    font-size: 1.2em;
}

.arrow {
    font-size: 1.5em;
    animation: bounce 1s infinite;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
}

.new-badges {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 20px;
    margin: 20px 0;
}

.new-badges h4 {
    margin: 0 0 15px 0;
    font-size: 1.3em;
}

.badge-item {
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 10px 0;
    padding: 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
}

.badge-icon {
    font-size: 2em;
}

.badge-info strong {
    display: block;
    font-size: 1.1em;
    margin-bottom: 5px;
}

.badge-info p {
    margin: 0;
    font-size: 0.9em;
    opacity: 0.8;
}

.progress-info {
    margin: 20px 0;
}

.current-level {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 1.2em;
    margin-bottom: 15px;
}

.level-icon {
    font-size: 1.5em;
}

.next-level-progress {
    margin-top: 15px;
}

.progress-bar {
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 10px;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4CAF50, #8BC34A);
    border-radius: 4px;
    transition: width 0.5s ease;
}

.max-level {
    font-size: 1.1em;
    font-weight: bold;
    margin: 0;
}

.popup-actions {
    margin-top: 20px;
}

.btn-continue {
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid white;
    color: white;
    padding: 12px 30px;
    border-radius: 25px;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-continue:hover {
    background: white;
    color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* RTL Support */
[dir="rtl"] .motivation-popup .popup-content {
    text-align: right;
}

[dir="rtl"] .level-display {
    flex-direction: row-reverse;
}

[dir="rtl"] .badge-item {
    flex-direction: row-reverse;
}

[dir="rtl"] .current-level {
    flex-direction: row-reverse;
}
</style>
`;

// Add CSS to document
if (!document.getElementById('motivation-css')) {
    const style = document.createElement('div');
    style.id = 'motivation-css';
    style.innerHTML = motivationCSS;
    document.head.appendChild(style);
}

// Initialize global gamification system
window.GamificationSystem = GamificationSystem;
window.gamification = new GamificationSystem();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GamificationSystem;
}
