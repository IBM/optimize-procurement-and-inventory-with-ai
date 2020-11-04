# Create a web-application to optimize plant selection based on cost and capacity

<!-- ![finalDemo](https://user-images.githubusercontent.com/10428517/82013347-f7e71500-962e-11ea-9c28-2dec7d5b30cd.gif) -->

As shown above, this application leverages Decision Optimization machine learning models to tell the user which plant to order items for in order to minimize cost.

By leveraging AI and machine learning, we help a store manager predict demand and optimize inventory while choosing plants with the lowest cost.

## Description

<!-- Using IBM AutoAI, you automate all the tasks involved in building predictive models for different requirements. You see how AutoAI generates great models quickly which save time and effort and aid in faster decision-making process. You create a model that from a data set that includes the age, sex, BMI, number-of-children, smoking preferences, region and charges to predict the health insurance premium cost that an individual pays. -->

When you have completed this code pattern, you understand how to:

<!-- * Setup, quickly, the services on IBM Cloud for building the model.
* Ingest the data and initiate the AutoAI process.
* Build different models using AutoAI and evaluate the performance.
* Choose the best model and complete the deployment.
* Generate predictions using the deployed model by making REST calls.
* Compare the process of using AutoAI and building the model manually.
* Visualize the deployed model using a front-end application. -->

### Architecture Components

![Architecture Components](./public/images/arch.png)

## Flow Description
1. The user creates an IBM Watson Studio Service on IBM Cloud.
2. The user creates an IBM Cloud Object Storage Service and adds that to Watson Studio.
3. The user uploads the demand and plant data files into Watson Studio.
4. The user creates an Decision Optimization experiment and sets objectives to minimize cost via the modeling assistant.
5. The user saves the Decision Optmization as a model, and deploys it using Watson Machine Learning.
6. The user uses the Node.js application to connect to the deployed model via API and find the optimal plant selection based on cost and capacity.

## Included components
*	[IBM Watson Studio](https://cloud.ibm.com/catalog/services/watson-studio) - IBM Watson® Studio helps data scientists and analysts prepare data and build models at scale across any cloud.
*	[IBM Watson Machine Learning](https://cloud.ibm.com/catalog/services/machine-learning) - IBM Watson® Machine Learning helps data scientists and developers accelerate AI and machine-learning deployment. 
*	[IBM Cloud Object Storage](https://cloud.ibm.com/catalog/services/cloud-object-storage) - IBM Cloud™ Object Storage makes it possible to store practically limitless amounts of data, simply and cost effectively.

## Featured technologies
+ [artificial-intelligence](https://developer.ibm.com/technologies/artificial-intelligence/) - Build and train models, and create apps, with a trusted AI-infused platform.
+ [Node.js](https://nodejs.org/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

## Prerequisites

This Cloud pattern assumes you have an **IBM Cloud** account. Go to the 
link below to sign up for a no-charge trial account - no credit card required. 
  - [IBM Cloud account](https://tinyurl.com/y4mzxow5)
  - [Node.js]https://nodejs.org/en/download/)

# Steps
0. [Download the data set ](#step-0-Download-the-data-set)
1. [Clone the repo](#step-1-clone-the-repo)
<!-- 2. [Explore the data (optional)](#step-2-explore-the-data-optional)
3. [Create IBM Cloud services](#step-3-create-ibm-cloud-services)
4. [Create and Run AutoAI experiment](#step-4-create-and-run-autoai-experiment)
5. [Create a deployment and test your model](#step-5-create-a-deployment-and-test-your-model)
6. [Create a notebook from your model (optional)](#step-6-create-a-notebook-from-your-model-optional)
7. [Run the application](#step-7-run-the-application) -->

## Step 1. Clone the repo

First, run the following command to clone the repo in the location of your choice. 

```
git clone https://github.ibm.com/Horea-Porutiu/decision-optimization-case-study
```

## Step 2. Download the dependencies

Go into the web-app directory and run `npm install`. Note that this app is tested using Node version 14.15.



## Step 3. Create IBM Cloud services

## Related Links
* [Predict Insurance Charges with AutoAI](https://github.com/IBM/predict-insurance-charges-with-autoai)
* [Use AutoAI to predict Customer Churn tutorial](https://developer.ibm.com/tutorials/watson-studio-auto-ai/)
* [Predict Loan Default with AutoAI tutorial](https://developer.ibm.com/tutorials/generate-machine-learning-model-pipelines-to-choose-the-best-model-for-your-problem-autoai/)

## License
This code pattern is licensed under the Apache Software License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1 (DCO)](https://developercertificate.org/) and the [Apache Software License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache Software License (ASL) FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)

