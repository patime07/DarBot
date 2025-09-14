// Content Generator - OpenAI API Integration with Enhanced Darija
const OPENAI_API_KEY = 'your_key';
const ELEVENLABS_API_KEY = 'your_key';
const VOICE_ID = 'PmGnwGtnBs40iau7JfoF'; // Jawad Voice in Darija

// Enhanced Darija validation with more authentic patterns
const DARIJA_PATTERNS = {
    // Must-have Darija expressions (higher priority)
    essential: [
        'باغي', 'عندك', 'كيفاش', 'شنو', 'واش', 'مزيان', 'ما علاش', 'يالله', 'ديالك', 'ف',
        'هاد الشي', 'أول حاجة', 'صاحبي', 'واخا', 'بصح', 'معقولة', 'غادي', 'كاين', 'ماكاينش', 'بلاك'
    ],
    
    // Darija-specific grammar (these must appear)
    grammar: [
        'ف ال', // "في ال" becomes "ف ال" in Darija
        'ديال ال', // possessive structure
        'هاد ال', // "this" structure  
        'داك ال', // "that" structure
        'كي', 'كيفاش', // how structures
        'غادي ن', 'غادي ت', // future tense
        'كا', // present continuous prefix
    ],
    
    // Standard Arabic phrases that must be avoided
    forbidden: [
        'لديك', 'يمكنك أن', 'على دراية', 'من الممكن', 'يجب عليك', 
        'في هذه الحالة', 'بإمكانك', 'دعونا نبدأ', 'يفضل أن', 'ينبغي',
        'بوسعك', 'من المفترض', 'من الأفضل', 'كما تعلم', 'كما ذكرنا'
    ],
    
    // Typical Darija conversation starters
    starters: [
        'يالله نشوفو', 'باغين نفهمو', 'واش عرفتي', 'هاد الشي', 
        'أول حاجة', 'ف الآخر', 'بصح', 'أ صاحبي', 'واخا', 'معقولة'
    ]
};

// Much stronger Darija prompt with examples
function createEnhancedDarijaPrompt() {
    return `أنت أستاذ مغربي من الدار البيضاء، متخصص في الذكاء الاصطناعي، وكتشرح للطلبة المغاربة بالدارجة المغربية الأصيلة.

⚠️ CRITICAL DARIJA REQUIREMENTS - يجب احترامها 100%:

1. اكتب بالدارجة المغربية الأصيلة فقط - NO STANDARD ARABIC
2. استعمل هذه الكلمات إجباريا في كل جزء:
   - "باغي نقوليك" (I want to tell you)
   - "واش عرفتي" (Do you know)
   - "هاد الشي مهم بزاف" (This thing is very important)
   - "يالله نشوفو" (Let's see)
   - "كيفاش كايخدم" (How it works)
   - "ف الآخر" (In the end)
   - "أ صاحبي" (My friend)
   - "بصح" (Really)

3. استعمل "ف" مكان "في" دائما
4. قل "عندك" مكان "لديك" 
5. قل "كيفاش" مكان "كيف"
6. قل "شنو" مكان "ماذا"
7. قل "واش" للأسئلة مكان "هل"
8. قل "غادي" للمستقبل مكان "سوف"
9. استعمل "كا" للمضارع (كايخدم، كايدير)

FORBIDDEN WORDS (ممنوع تماما):
❌ "لديك" → ✅ "عندك"
❌ "يمكنك أن" → ✅ "تقدر" 
❌ "يجب عليك" → ✅ "خاصك"
❌ "دعونا نبدأ" → ✅ "يالله نبداو"
❌ "كيف يمكن" → ✅ "كيفاش ممكن"
❌ "في هذه الحالة" → ✅ "ف هاد الحالة"

EXAMPLE OF PERFECT DARIJA:
"أ صاحبي، باغي نقوليك على حاجة مهمة بزاف ف عالم الذكاء الاصطناعي. واش عرفتي شنو هو البحث؟ هاد الشي كايخدم بحال لما كنت كتقلب على شي حاجة ف الدار ديالك. يالله نشوفو كيفاش كايخدم..."

Create a lesson about "مقدمة ف البحث ف الذكاء الاصطناعي" with:
- 4 chunks, each 300-400 words in pure Darija
- Each chunk must contain at least 5 of the required Darija expressions
- Sound like a Moroccan professor talking naturally to his students
- Use simple analogies from Moroccan daily life
- Include technical terms but explain them in Darija

Structure as JSON:
{
  "title": "مقدمة ف البحث ف الذكاء الاصطناعي",
  "estimatedTime": "10:00",
  "chunks": [
    {
      "id": 1,
      "title": "شنو هو البحث؟",
      "timeStart": "0:00",
      "timeEnd": "2:30", 
      "arabicText": "[PURE DARIJA TEXT WITH REQUIRED EXPRESSIONS]",
      "englishSummary": "Brief English summary",
      "wordCount": 350
    },
    ...3 more chunks
  ]
}`;
}

// Stricter validation with mandatory phrase checking
function validateDarijaQuality(text) {
    if (!text || typeof text !== 'string') return false;
    
    let score = 0;
    const issues = [];
    
    // 1. Check for mandatory Darija expressions (must have at least 3)
    const requiredExpressions = [
        'باغي نقوليك', 'واش عرفتي', 'هاد الشي مهم', 'يالله نشوفو', 
        'كيفاش كايخدم', 'أ صاحبي', 'بصح'
    ];
    
    const foundExpressions = requiredExpressions.filter(expr => 
        text.includes(expr)
    );
    
    if (foundExpressions.length >= 3) {
        score += 40;
        console.log(`✅ Found ${foundExpressions.length} mandatory expressions:`, foundExpressions);
    } else {
        issues.push(`Only ${foundExpressions.length}/7 mandatory Darija expressions found`);
    }
    
    // 2. Check for Darija grammar patterns
    const grammarPatterns = ['ف ال', 'ديال ال', 'هاد ال', 'كايخدم', 'كايدير', 'غادي'];
    const foundGrammar = grammarPatterns.filter(pattern => text.includes(pattern));
    
    if (foundGrammar.length >= 2) {
        score += 30;
    } else {
        issues.push(`Only ${foundGrammar.length} Darija grammar patterns found`);
    }
    
    // 3. Check for forbidden Standard Arabic (critical)
    const forbiddenFound = DARIJA_PATTERNS.forbidden.filter(phrase => text.includes(phrase));
    
    if (forbiddenFound.length === 0) {
        score += 30;
    } else {
        issues.push(`❌ FORBIDDEN Standard Arabic found: ${forbiddenFound.join(', ')}`);
        score -= 30; // Heavy penalty
    }
    
    console.log(`🎯 Darija Quality Score: ${score}/100`);
    if (issues.length > 0) {
        console.log('🔍 Issues:', issues);
    }
    
    return score >= 70;
}

// Enhanced lesson generation with multiple retries
async function generateLesson1() {
    const maxRetries = 5; // Increase retries
    let attempt = 0;
    
    while (attempt < maxRetries) {
        attempt++;
        console.log(`🔄 Generating lesson attempt ${attempt}/${maxRetries}...`);
        
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [
                        {
                            role: 'system',
                            content: `أنت أستاذ مغربي من الرباط، عايش ف المغرب 40 سنة، كتشرح الذكاء الاصطناعي للطلبة المغاربة بالدارجة المغربية الأصيلة 100%. 
                            
                            CRITICAL: You must write ONLY in authentic Moroccan Darija. Never use Standard Arabic phrases. Use conversational Moroccan expressions like "أ صاحبي", "باغي نقوليك", "واش عرفتي", "هاد الشي", "كيفاش كايخدم".
                            
                            Your personality: Friendly Moroccan professor who uses simple analogies from daily Moroccan life (like finding your keys, navigating Marrakech medina, etc.)`
                        },
                        {
                            role: 'user',
                            content: createEnhancedDarijaPrompt()
                        }
                    ],
                    max_tokens: 4000,
                    temperature: 0.9, // Higher for more natural, conversational Darija
                    presence_penalty: 0.2,
                    frequency_penalty: 0.1
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
            }

            const data = await response.json();
            let responseContent = data.choices[0].message.content;
            
            // Clean up response
            responseContent = responseContent.replace(/```json/g, '').replace(/```/g, '').trim();
            
            // Try to parse JSON
            let lessonContent;
            try {
                lessonContent = JSON.parse(responseContent);
            } catch (parseError) {
                console.log('JSON parse failed, attempting to fix...');
                // Try to extract JSON from response
                const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    lessonContent = JSON.parse(jsonMatch[0]);
                } else {
                    throw new Error('No valid JSON found in response');
                }
            }
            
            // Validate Darija quality
            const isValidDarija = validateLessonDarija(lessonContent);
            
            if (isValidDarija) {
                console.log(`✅ Lesson generated in authentic Darija on attempt ${attempt}`);
                
                // Post-process to ensure even better Darija
                lessonContent.chunks = lessonContent.chunks.map(chunk => ({
                    ...chunk,
                    arabicText: enhanceDarijaText(chunk.arabicText)
                }));
                
                return lessonContent;
            } else {
                console.log(`❌ Attempt ${attempt} failed Darija validation`);
                if (attempt === maxRetries) {
                    console.warn('⚠️ All attempts failed validation, returning last attempt');
                    return lessonContent;
                }
            }

        } catch (error) {
            console.error(`❌ Attempt ${attempt} failed:`, error.message);
            if (attempt === maxRetries) {
                throw new Error(`Failed to generate lesson after ${maxRetries} attempts: ${error.message}`);
            }
        }
        
        // Wait before retry (increase delay with each attempt)
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
    }
    
    return null;
}

// Enhanced Darija text improvement
function enhanceDarijaText(text) {
    let enhanced = text;
    
    // Force Darija replacements
    const forcedReplacements = [
        // Must-fix Standard Arabic patterns
        [/في ال/g, 'ف ال'],
        [/لديك/g, 'عندك'],
        [/يمكنك أن/g, 'تقدر'],
        [/يجب عليك/g, 'خاصك'],
        [/دعونا نبدأ/g, 'يالله نبداو'],
        [/كيف يمكن/g, 'كيفاش ممكن'],
        [/ماذا/g, 'شنو'],
        [/كيف/g, 'كيفاش'],
        [/هل تعرف/g, 'واش تعرف'],
        [/جيد جداً/g, 'مزيان بزاف'],
        [/لا بأس/g, 'ما علاش'],
        
        // Add Darija flavor
        [/\bأن\b/g, 'باش'], // "that" in purpose
        [/\bسوف\b/g, 'غادي'], // "will"
        [/\bيعمل\b/g, 'كايخدم'], // "works"
        [/\bنقوم\b/g, 'كنديرو'], // "we do"
    ];
    
    forcedReplacements.forEach(([pattern, replacement]) => {
        enhanced = enhanced.replace(pattern, replacement);
    });
    
    // Add mandatory Darija expressions if missing
    if (!enhanced.includes('أ صاحبي') && !enhanced.includes('باغي نقوليك')) {
        enhanced = 'أ صاحبي، ' + enhanced;
    }
    
    return enhanced;
}

// Validate entire lesson for Darija quality
function validateLessonDarija(lessonContent) {
    if (!lessonContent || !lessonContent.chunks) {
        console.error('❌ Invalid lesson structure');
        return false;
    }
    
    let totalScore = 0;
    let validChunks = 0;
    
    console.log('🔍 Validating lesson chunks for Darija quality...');
    
    for (const chunk of lessonContent.chunks) {
        if (chunk.arabicText) {
            const chunkValid = validateDarijaQuality(chunk.arabicText);
            if (chunkValid) {
                validChunks++;
                totalScore += 1;
            }
            
            console.log(`📝 Chunk "${chunk.title}": ${chunkValid ? '✅ Valid' : '❌ Invalid'} Darija`);
        }
    }
    
    const overallScore = validChunks > 0 ? (validChunks / lessonContent.chunks.length) * 100 : 0;
    console.log(`📊 Overall Darija Quality: ${overallScore}% (${validChunks}/${lessonContent.chunks.length} chunks valid)`);
    
    return overallScore >= 75; // Require 75% of chunks to be valid
}

// ElevenLabs Audio Generation with better Darija pronunciation
async function generateAudio(text, filename) {
    try {
        console.log(`🎵 Generating audio for: ${filename}`);
        
        // Enhanced preprocessing for Darija
        const processedText = preprocessDarijaForAudio(text);
        
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': ELEVENLABS_API_KEY
            },
            body: JSON.stringify({
                text: processedText,
                model_id: 'eleven_multilingual_v2', // Best for Arabic
                voice_settings: {
                    stability: 0.8,        // Higher for consistent Arabic
                    similarity_boost: 0.9, // Maximum voice consistency  
                    style: 0.4,           // Natural conversational style
                    use_speaker_boost: true
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('ElevenLabs API Error:', errorData);
            throw new Error(`ElevenLabs API error: ${response.status} - ${errorData.detail || 'Unknown error'}`);
        }

        const audioBuffer = await response.arrayBuffer();
        console.log(`✅ Audio generated successfully for: ${filename} (${audioBuffer.byteLength} bytes)`);
        return audioBuffer;

    } catch (error) {
        console.error('❌ Error generating audio:', error);
        return null;
    }
}

// Better preprocessing for Darija audio
function preprocessDarijaForAudio(text) {
    let processed = text;
    
    // Add natural pauses for better speech flow
    processed = processed.replace(/[.!؟]/g, '$&<break time="0.7s"/>');
    processed = processed.replace(/[،,]/g, '$&<break time="0.3s"/>');
    
    // Emphasize important Darija words for natural delivery
    const emphasisWords = [
        'باغي نقوليك', 'واش عرفتي', 'أ صاحبي', 'هاد الشي', 'بصح', 
        'يالله', 'كيفاش', 'مزيان بزاف', 'معقولة', 'واخا'
    ];
    
    emphasisWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        processed = processed.replace(regex, `<emphasis level="moderate">${word}</emphasis>`);
    });
    
    // Add pronunciation guidance for technical terms
    processed = processed.replace(/الذكاء الاصطناعي/g, 'الذكاء الاصطناعي<break time="0.4s"/>');
    processed = processed.replace(/خوارزمية/g, '<phoneme alphabet="ipa" ph="xawarizmi.ja">خوارزمية</phoneme>');
    
    return processed;
}

// Main lesson generation function
async function generateCompleteLesson(progressCallback = null) {
    console.log('🚀 Starting enhanced Darija lesson generation...');
    
    try {
        // 1. Generate lesson content with strict Darija validation
        if (progressCallback) progressCallback('Generating authentic Darija content...', 10);
        
        const lessonContent = await generateLesson1();
        if (!lessonContent) {
            throw new Error('Failed to generate lesson content after multiple attempts');
        }
        
        console.log('✅ Lesson content generated successfully');

        // 2. Generate audio for each chunk
        if (progressCallback) progressCallback('Generating Darija audio...', 40);
        
        const audioFiles = [];
        const totalChunks = lessonContent.chunks.length;
        
        for (let i = 0; i < totalChunks; i++) {
            const chunk = lessonContent.chunks[i];
            console.log(`🎵 Processing audio ${i + 1}/${totalChunks}...`);
            
            if (progressCallback) {
                const progress = 40 + (i / totalChunks) * 50;
                progressCallback(`Generating audio ${i + 1}/${totalChunks}...`, progress);
            }
            
            const audio = await generateAudio(chunk.arabicText, `lesson1_chunk${i + 1}.mp3`);
            if (audio) {
                audioFiles.push({
                    chunkId: chunk.id,
                    filename: `lesson1_chunk${i + 1}.mp3`,
                    audioData: audio
                });
            } else {
                console.warn(`⚠️ Failed to generate audio for chunk ${i + 1}`);
            }
            
            // Respect API rate limits
            await new Promise(resolve => setTimeout(resolve, 1500));
        }

        // 3. Save complete lesson
        if (progressCallback) progressCallback('Saving lesson...', 95);
        
        const completeLesson = {
            lesson: lessonContent,
            audio: audioFiles,
            generatedAt: new Date().toISOString(),
            version: '2.0'
        };

        // Save to localStorage
        await window.ContentSaver.saveContent(completeLesson);
        
        if (progressCallback) progressCallback('🎉 Darija lesson generated successfully!', 100);
        console.log('🎉 Complete authentic Darija lesson generated and saved!');
        
        return completeLesson;

    } catch (error) {
        console.error('❌ Error in lesson generation:', error);
        if (progressCallback) progressCallback(`Error: ${error.message}`, 0);
        throw error;
    }
}

// Test function specifically for Darija validation
async function testDarijaGeneration() {
    console.log('🧪 Testing enhanced Darija generation...');
    
    try {
        const lesson = await generateLesson1();
        if (lesson && lesson.chunks) {
            console.log('📝 Generated lesson title:', lesson.title);
            
            // Test each chunk
            lesson.chunks.forEach((chunk, index) => {
                console.log(`\n--- Chunk ${index + 1}: ${chunk.title} ---`);
                console.log(chunk.arabicText.substring(0, 200) + '...');
                
                const quality = validateDarijaQuality(chunk.arabicText);
                console.log(`Quality: ${quality ? '✅ PASS' : '❌ FAIL'}`);
            });
            
            return lesson;
        } else {
            console.error('❌ No lesson generated');
            return null;
        }
    } catch (error) {
        console.error('❌ Test failed:', error);
        return null;
    }
}

// Utility functions
function clearLessonData() {
    localStorage.removeItem('lesson1_complete');
    localStorage.removeItem('lesson1_text');
    let index = 1;
    while (localStorage.getItem(`lesson1_audio_chunk${index}`)) {
        localStorage.removeItem(`lesson1_audio_chunk${index}`);
        index++;
    }
    console.log('🧹 Lesson data cleared');
}

function loadLesson1() {
    const savedLesson = localStorage.getItem('lesson1_complete');
    if (savedLesson) {
        try {
            return JSON.parse(savedLesson);
        } catch (error) {
            console.error('Error parsing saved lesson:', error);
            return null;
        }
    }
    return null;
}

// Export all functions
window.ContentGenerator = {
    generateCompleteLesson,
    generateLesson1,
    generateAudio,
    loadLesson1,
    validateDarijaQuality,
    validateLessonDarija,
    enhanceDarijaText,
    preprocessDarijaForAudio,
    clearLessonData,
    testDarijaGeneration,
    DARIJA_PATTERNS
};