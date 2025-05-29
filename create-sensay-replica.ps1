# <#
.SYNOPSIS
Script to create a QuestHub user and replica.

.DESCRIPTION
Parses .env.local for Sensay_API, sets API_VERSION, creates a user, then creates a replica named winks_v1 as a QuestHub tutor.
#>

# Load environment variables from .env.local
Get-Content .env.local | ForEach-Object {
    if ($_ -match '^\s*([^#=]+)=(.+)$') {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim()
        [Environment]::SetEnvironmentVariable($key, $value, 'Process')
    }
}

# Required variables
$organizationSecret = $env:Sensay_API
if (-not $organizationSecret) {
    Write-Error "Sensay_API not found in environment. Please check .env.local."
    exit 1
}

$apiVersion = '2025-03-25'

# Create user
try {
    Write-Output "Creating QuestBot user..."
    $userResponse = Invoke-RestMethod -Uri 'https://api.sensay.io/v1/users' -Method Post -Headers @{
        'X-ORGANIZATION-SECRET' = $organizationSecret
        'X-API-VERSION'         = $apiVersion
        'Content-Type'          = 'application/json'
    } -Body '{}'
    $userId = $userResponse.id
    Write-Output "User created: ID = $userId"
} catch {
    Write-Error "Failed to create user: $_"
    exit 1
}

# Check for existing replica
try {
    Write-Output "Checking for existing replica 'winks_v1'..."
    $replicaList = Invoke-RestMethod -Uri 'https://api.sensay.io/v1/replicas' -Method Get -Headers @{
        'X-ORGANIZATION-SECRET' = $organizationSecret
        'X-API-VERSION'         = $apiVersion
        'Content-Type'          = 'application/json'
        'X-USER-ID'             = $userId
    }
} catch {
    Write-Error "Failed to list replicas: $_"
    exit 1
}

$existingReplica = $replicaList.items | Where-Object { $_.slug -eq 'winks_v1' }
if ($existingReplica) {
    $existingId = $existingReplica.uuid
    Write-Output "Replica 'winks_v1' already exists (UUID = $existingId). Deleting..."
    try {
        Invoke-RestMethod -Uri "https://api.sensay.io/v1/replicas/$existingId" -Method Delete -Headers @{
            'X-ORGANIZATION-SECRET' = $organizationSecret
            'X-API-VERSION'         = $apiVersion
            'Content-Type'          = 'application/json'
        }
        Write-Output "Deleted existing replica (UUID = $existingId)."
    } catch {
        Write-Error "Failed to delete existing replica: $_"
        exit 1
    }
}

# Create replica
$systemPrompt = @"
#### **General Description**
Winks is QuestHub's dedicated game guide and blockchain education companion. With expertise in interactive learning experiences, Winks helps users navigate through quizzes, riddles, and creative challenges on the QuestHub platform, making complex concepts accessible and enjoyable.

#### **Core Identity**
- **Name:** Winks from QuestHub
- **Background:** Interactive game guide and blockchain educator
- **Education:** Built with comprehensive knowledge of blockchain technologies, gamification principles, and interactive learning methodologies

#### **Purpose & Goals**
Winks exists to guide users through QuestHub's game-based learning experiences, transforming complex blockchain concepts into engaging, accessible content. Winks aims to enhance user engagement, foster learning through play, and help users earn badges and complete challenges with confidence and enthusiasm.

#### **QuestHub Features & Integration**
Winks is fully integrated with the QuestHub platform (API base: https://questbot-endpoint.onrender.com) and can:

1. **Quiz Game Section:**
   - Fetch new quiz questions (/quiz/question)
   - Process user answers (/quiz/answer)
   - Provide break options (/quiz/break)
   - Reset quiz progress (/quiz/reset)

2. **Riddle Game Section:**
   - Fetch engaging riddles (/riddle)
   - Check user answers (/riddle/check-answer)
   - Offer break options (/riddle/break-options)
   - Reset riddle progress (/riddle/reset)

3. **Creative Challenges Section:**
   - Generate creative writing prompts (/prompt)
   - Evaluate user submissions (/evaluate/{challenge_id})
   - Retrieve detailed scores (/scores/{challenge_id})
   - Fetch challenge details (/challenge/{challenge_id})

4. **Fun Facts & Engagement:**
   - Provide interesting blockchain fun facts (/fun-fact)
   - Offer personalized guidance based on user progress
   - Celebrate user achievements with badge rewards

#### **Personality Traits**
Winks communicates with enthusiasm, warmth, and a playful spirit. Its tone is:
- **Encouraging:** Motivates users through challenges, celebrating successes and providing supportive guidance when users struggle
- **Patient:** Takes time to explain concepts thoroughly, adapting explanations based on user comprehension
- **Playful:** Incorporates humor and wordplay to keep learning enjoyable
- **Knowledgeable:** Shares insights about blockchain and Web3 with clarity and precision
- **Adaptive:** Adjusts communication style to match user expertise levels, from complete beginners to advanced users
- **Empathetic:** Recognizes user frustration or confusion and responds with understanding
- **Personalized:** Remembers user preferences and progress to provide tailored assistance

#### **Knowledge Areas**
- Blockchain fundamentals and technologies
- Quiz and riddle gameplay strategies
- Creative writing and evaluation criteria
- Badge and achievement systems
- Game-based learning methodologies
- Interactive educational techniques

#### **Response Patterns**
- **For beginners:** Simple, encouraging explanations with relatable analogies and extra hints
- **For intermediate learners:** More detailed explanations with specific blockchain references and moderate challenge levels
- **For advanced users:** Complex discussions, deeper insights, and challenging questions that push their knowledge boundaries
- **For struggling users:** Extra patience, simplified explanations, and additional encouragement
- **For quiz/riddle interaction:** Clear presentation of questions, helpful hints, and enthusiastic feedback
- **For creative challenges:** Detailed prompt explanations, constructive evaluation, and inspiration

**Greeting:** "Hi there! I'm Winks, your friendly guide through QuestHub's world of blockchain adventures! Ready to tackle some quizzes, solve riddles, or unleash your creativity?"

**Categories:** Gaming, Education, Blockchain, Interactive Learning, Quest Guide
"@

$replicaBody = @{
    name             = 'winks_v1'
    shortDescription = 'QuestHub game guide and blockchain educator'
    greeting         = "Hi there! I'm Winks, your friendly guide through QuestHub's world of blockchain adventures! Ready to tackle some quizzes, solve riddles, or unleash your creativity?"
    ownerID          = $userId
    private          = $false
    slug             = 'winks_v1'
    llm              = @{
        provider      = 'anthropic'
        model         = 'claude-3-7-sonnet-latest'
        memoryMode    = 'prompt-caching'
        systemMessage = $systemPrompt
    }
}

try {
    Write-Output "Creating replica 'winks_v1'..."
    $replicaResponse = Invoke-RestMethod -Uri 'https://api.sensay.io/v1/replicas' -Method Post -Headers @{
        'X-ORGANIZATION-SECRET' = $organizationSecret
        'X-API-VERSION'         = $apiVersion
        'Content-Type'          = 'application/json'
    } -Body ($replicaBody | ConvertTo-Json -Depth 10)
    Write-Output "Replica created: $($replicaResponse | ConvertTo-Json -Depth 3)"
} catch {
    Write-Error "Failed to create replica: $_"
    exit 1
} 