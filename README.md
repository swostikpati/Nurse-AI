# HPC Code
There are 3 files to run the Med42 on HPC and receive the output from your local machine.

On the HPC system, upload the file hpc.py and hugging-face.py(for HPC server and for hugging face trial). On line 31, change the value of "localhost" to your IP address. On line 43, 48, 51, change that value of cache_dir to your desired locationin the HPC:
```
31  localhost="000000" #change your IP address here

43  tokenizer = AutoTokenizer.from_pretrained(model_name_or_path, cache_dir="") #change the cache_dir to your desired location
```

On your local machine, navigate to the hpc-code folder and install all dependencies (Express module):
```
cd hpc-code
npm install express
```

To run the code, you need to first run the hugging-face.py script to download all the necessary packages from the hugging face.
```
python3 hugging-face.py
```

Then, run the hpc.py script to have a server on HPC (the server will check for any request every 6 seconds).
```
python3 hpc.py
```

Finally, on you local machine, run the server.js script to send and receive information from the HPC:
```
node server.js
```

# LLMs4Nursing

Implementing a demo prototype for review on Thursday, March 28

Trello Card: [https://trello.com/c/dwn71Ip5/33-new-prototype](https://trello.com/c/dwn71Ip5/33-new-prototype)

**User Stories**

1. Help me with an update

- Link patient data
- Record user update
  - After recording made, shown in page as replayable link or "New Recording"
- Menu becomes available with 3 options
  * Feedback (shows the questions on how to update for a better update)
  * A better update (shows a written rewrite of the update)
  * A SOAP note

2. Practice with a case

- practice with a case (a list of cases they can select or search)
  - once a case is selected, they can read it and the same options as above show

**Other**

- Basic login, profile, session management for chat history

* practice with a case
  * a list of cases they can select or search
  * once a case is selected, they can read it and the same options as above show# Nurse-AI
