Privacy Policy for YouTube Drag Shot

Thank you for using YouTube Drag Shot (the "Extension"), developed by Ajay Dhiman ("we," "us," or "our"). This Privacy Policy explains how we handle information when you use our Extension.
Our core principle is to provide the functionality of capturing and managing YouTube video screenshots locally within your browser with minimal data access.

1. Information We Access (But Do Not Collect or Store Externally)
The Extension needs to access certain information solely to perform its intended functions:
Website Content (YouTube Video Frames & Page Structure):
To capture a screenshot, the Extension accesses the pixel data of the currently displayed video frame on the active YouTube.com page using standard browser Canvas APIs.
To display the screenshot button and the screenshot gallery, the Extension needs to interact with the structure (DOM) of the YouTube.com page you are viewing.
User Interface Settings:
The Extension uses your browser's localStorage (specifically tied to the youtube.com domain) to store your preference for the gallery's display mode (e.g., dark mode). This setting remains solely on your local device.

2. Information We DO NOT Collect
We want to be explicitly clear about what the Extension does not do:
No Personally Identifiable Information (PII): We do not collect, store, or transmit any personal information like your name, email address, physical address, age, passwords, or user identifiers.
No Sensitive Information: We do not collect health, financial, authentication, or location data.
No Web History or User Activity Tracking: The Extension does not track your general browsing history or detailed user activity (like unrelated mouse movements or keystrokes). Its activity is limited to interacting with its own buttons and the YouTube video/page structure necessary for screenshots.
No External Data Transmission: The Extension does not send any captured screenshots, settings, or any other data to our servers or any third-party servers. All processing and temporary storage happen entirely within your local browser on your device.

3. How We Use Accessed Information
The information accessed is used exclusively for the following purposes, directly related to the Extension's single purpose:
Capturing Screenshots: Accessing video frames is essential to create the screenshot image data.
Displaying UI: Accessing the page structure is necessary to insert the screenshot button and the gallery interface onto the YouTube page.
Storing Settings: Using localStorage allows the Extension to remember your gallery display preference between sessions on YouTube.
Facilitating Drag-and-Drop: The Extension prepares the captured screenshot data (as Data URLs, Blobs, or File objects) to be used by the browser's native Drag-and-Drop functionality when you, the user, initiate a drag action.

4. Data Storage and Handling
Screenshots: Captured screenshots are temporarily represented as image data (Data URLs, Blob URLs) within your browser's memory for the current session. They are displayed in the gallery interface. They are not saved automatically to your device's storage or sent anywhere by the Extension. The data only leaves the browser if you explicitly:
Drag and drop the image into another application (the browser/OS handles this transfer based on the receiving application's capabilities).
Click the "Download" button for a specific screenshot (this uses standard browser download functionality to save the file locally).
Settings: The dark mode preference is stored in your browser's localStorage for youtube.com and persists until you clear your browser data for that site or the Extension removes it.

5. Data Sharing and Third Parties
The Extension does not share, sell, or transfer any user data to any third parties or external services.
The drag-and-drop functionality is initiated by you. The Extension provides the necessary data formats to the browser's DataTransfer API, but the actual transfer of data to another application is a process handled by your browser and operating system, directed by your explicit action of dropping the image onto a target application.

6. User Control
You have full control over the Extension's core functions:
You initiate screenshot capture by clicking the button.
You initiate the transfer of a screenshot by performing a drag-and-drop action or clicking download.
You can clear all temporarily displayed screenshots using the "Clear All" button.
You can disable or uninstall the Extension at any time through your browser's extension management settings.

7. Security
Since the Extension processes data locally and does not transmit data externally, the primary security considerations relate to the browser's own security model. We rely on the security measures built into your web browser and operating system.

8. Children's Privacy
The Extension is not directed towards children under the age of 13 (or the relevant age in your jurisdiction), and we do not knowingly collect any information from them.

9. Changes to This Privacy Policy
We may update this Privacy Policy from time to time. If we make significant changes, we will notify users through appropriate means (e.g., updating the extension description or requiring re-acceptance of permissions if necessary). We encourage you to review this policy periodically. Your continued use of the Extension after changes constitutes your acceptance of the revised policy.

10. Contact Us
If you have any questions about this Privacy Policy, please contact us at: ajaynatsu@gmail.com