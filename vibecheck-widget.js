class VibecheckWidget extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
          <style>
            .container {
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              align-items: center;
              width: 100%;
              height: 100%;
            }
            .vibecheck-button {
              font-size: 2rem;
              border-radius: 50%;
              border: none;
              width: 3rem;
              height: 3rem;
              cursor: pointer;
            }
            .vibecheck-button:hover {
              transform: scale(1.1);
            }
            .vibecheck-button:active {
              transform: scale(0.9);
            }
            .happy {
              background-color: #aaffaa;
            }
            .meh {
              background-color: #dddd77;
            }
            .sad {
              background-color: #ffaaaa;
            }
            .message {
                font-size: 1rem;
                text-align: center;
                margin-top: 1rem;
            }
          </style>
          <div class="container">
            <button class="vibecheck-button happy">🙂</button>
            <button class="vibecheck-button meh">😐</button>
            <button class="vibecheck-button sad">🙁</button>
          </div>
          <div class="message"></div>
        `;

        // Get the attribute values and store them as properties
        this.projectName = this.getAttribute('project');
        this.userKey = this.getAttribute('user-key');
        this.server = this.getAttribute('server').replace(/\/$/, '');
        this.sectionId = this.getAttribute('section-id');
    }

    connectedCallback() {
        const happyButton = this.shadowRoot.querySelector('.happy');
        const sadButton = this.shadowRoot.querySelector('.sad');
        const mehButton = this.shadowRoot.querySelector('.meh');

        happyButton.addEventListener('click', () => this.sendFeedback('happy'));
        mehButton.addEventListener('click', () => this.sendFeedback('medium'));
        sadButton.addEventListener('click', () => this.sendFeedback('sad'));
    }

    sendFeedback(feeling) {
        // Make an API call with the specified attributes
        const feedbackData = {
            button_name: feeling,
            feedback: '',
            section_id: this.sectionId,
            timestamp_utc: new Date().toISOString(),
        };

        fetch(`${this.server}/api/v1/projects/${this.projectName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-User-Key": this.userKey,
            },
            body: JSON.stringify(feedbackData),
        }).then(response => {
            if (response.ok) {
                console.log('Feedback sent successfully!');
                this.shadowRoot.querySelector('.message').innerHTML = 'Feedback sent successfully!';
                // Deactivate the buttons
                this.shadowRoot.querySelector('.happy').disabled = true;
                this.shadowRoot.querySelector('.meh').disabled = true;
                this.shadowRoot.querySelector('.sad').disabled = true;
            } else {
                console.error('Failed to send feedback.');
                this.shadowRoot.querySelector('.message').innerHTML = 'Failed to send feedback.';
            }
        }).catch(error => {
            console.error('An error occurred while sending the feedback:', error);
            this.shadowRoot.querySelector('.message').innerHTML = 'An error occurred while sending the feedback.';
        });
    }
}