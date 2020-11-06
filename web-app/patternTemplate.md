# Short title

Create a web-app to optimize your supply chain inventory   

# Long title

Create a web-application that uses IBM's Decision Optimization prescriptive analytics model to choose which plant to order items from

# Author

* Horea Porutiu - horea.porutiu@ibm.com

### Github repo

> https://github.com/IBM/optimize-procurement-and-inventory-with-ai

# Summary
In this code pattern we will create a web-based application to optimize inventory.

Using historical demand data to train our machine learning model, we can predict demand for certain items more accurately in the 
future, and ensure that our customers will be able to purchase what they want. Using this predicted demand as input, 
along with manufacturing plant data such as cost and capacity, our application will enable a store manager to quickly 
choose the best manufacturing plants in order to optimize inventory and minimize cost. 

When the reader has completed this code pattern they will understand how to:

* Deploy a Node.js based web application
* Send and receive messages from a deployed Watson Machine Learning model using REST APIs

### Architecture Components

![flow-diagrm](./public/images/arch.png)

## Flow Description
1. The user creates an IBM Watson Studio Service on IBM Cloud.
2. The user creates an IBM Cloud Object Storage Service and adds that to Watson Studio.
3. The user uploads the demand and plant data files into Watson Studio.
4. The user creates an Decision Optimization experiment and sets objectives to minimize cost via the modeling assistant.
5. The user saves the Decision Optimization as a model, and deploys it using Watson Machine Learning.
6. The user uses the Node.js application to connect to the deployed model via API and finds the optimal plant selection based on cost and capacity.



# Instructions

Get detailed instructions from the [README](https://github.ibm.com/Horea-Porutiu/decision-optimization-case-study/blob/master/web-app/README.md) file. Those 
instructions explain how to:

1. [Clone the repo](#step-1-clone-the-repo)
2. [Set the Model Deployment ID](#step-2-set-the-model-deployment-id)
3. [Set the Model Space ID](#step-3-set-the-model-space-id)
4. [Create an IBM Cloud API key](#step-4-create-an-IBM-Cloud-api-key)
5. [Generate the access token](#step-5-Generate-the-access-token)
6. [Run the application](#step-6-run-the-app)

This code pattern is part of the [Develop an intelligent inventory and procurement strategy using AI](https://github.ibm.com/Horea-Porutiu/decision-optimization-case-study) series.




# Components and services
*	[IBM Watson Studio](https://console.bluemix.net/docs/services/blockchain/howto/ibp-v2-deploy-iks.html#ibp-v2-deploy-iks) gives you total control of your blockchain network with a user interface that can simplify and accelerate your journey to deploy and manage blockchain components on the IBM Cloud Kubernetes Service.
*	[IBM Watson Machine Learning](https://cloud.ibm.com/catalog/services/machine-learning) - IBM Watson® Machine Learning helps data scientists and developers accelerate AI and machine-learning deployment. 
*	[IBM Cloud Object Storage](https://cloud.ibm.com/catalog/services/cloud-object-storage) - IBM Cloud™ Object Storage makes it possible to store practically limitless amounts of data, simply and cost effectively.

# Runtimes

* Node.js

## Related IBM Developer Content
* [Build a predictive machine learning model quickly and easily with IBM SPSS Modeler](https://developer.ibm.com/tutorials/build-an-ai-model-visually-with-spss-modeler-flow/)
* [Fraud detection with SPSS Modeler](https://developer.ibm.com/tutorials/fraud-detection-with-spss-modeler/)

## Related links
* [Decision Optimization](https://www.ibm.com/analytics/decision-optimization)
* [Decision Optimization for Watson Studio](https://www.ibm.com/cloud/decision-optimization-for-watson-studio)
