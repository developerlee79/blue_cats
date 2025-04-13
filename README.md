# Whiplash

A more affordable, 
more understanding, 
and sovereign 
decentralized AI marketing solution

(built for the BuidlAI 2025 Hackathon)

<br>

## How to run

### BackEnd & Database
Build and run the BackEnd & Database application stack using Docker Compose:

```bash
docker compose up -d --build
```

<br>

### FrontEnd

Run the following commands to start the Frontend demo:

```bash
cd /bluecats_fe
yarn install
yarn start
```

Then open your browser and navigate to:
> http://localhost:3000

<br>

### AI Agent

The deployed NEAR AI Agent can be accessed at the following URL:
> https://app.near.ai/agents/redsite5429.near/bluecats_agent/latest

<br>

## Environment File

Add your API key to the .env file, using the provided example as a reference.

<br>

## Architecture Overview

![1](https://github.com/user-attachments/assets/4f0fe24b-ddf9-45b9-845a-0cee48da5243)

**Collection and Refinement of Latest Community-Driven Trend Data**

To collect up-to-date trend data for marketing purposes, an automated crawling agent periodically scrapes high-velocity trend sources such as Reddit and X (formerly Twitter).

The raw data is then processed and enriched using Upstage LLM-based models, which extract semantic context, including key topics and relevant keywords, transforming it into structured JSON-ready format.

The structured output is persisted in a PostgreSQL database and serves as the core dataset for context-aware, personalized marketing solutions.

![2](https://github.com/user-attachments/assets/303b5d19-202a-40f7-a9e6-8db26f1385a7)

** Web3 Wallet Authentication System & Document-based user context profiling (services and companies) for tailored marketing recommendations **

Privacy-preserving wallet login enables users to access business services without exposing any personally identifiable information (PII), ensuring both anonymity and secure authentication.

Using Upstage's information-extract AI model, the system analyzes user-submitted service documents (e.g., whitepapers, websites, and related materials) to extract user background and contextual metadata.

This contextual understanding is then used to generate personalized marketing data tailored to each user's domain and service characteristics.

![3](https://github.com/user-attachments/assets/e735bdf9-5131-48af-b684-6ea23854f192)

** Providing Personalized Marketing Solutions by Integrating User Context with the Latest Trend Data Using LLM-Powered AI Agent **

This system uses an LLM AI Agent deployed on NEAR.AI to generate personalized marketing outputs by combining:

User context, extracted from submitted documents (e.g., whitepapers, service descriptions) using Upstage's information-extract model

Real-time trend data, crawled from online communities like Reddit and X

The AI Agent matches semantic elements from both sources — such as service domain, product focus, and trend topics — to produce structured data that can be used in context-aware marketing workflows.




