# vibecheck (standalone)

This repository contains the code for a standalone HTML element that displays a "vibecheck" widget similar to [`jupyter-vibecheck`](https://github.com/KordingLab/jupyter-vibecheck). Once you have created a Datatops dataset to catch reviews (see [here](https://github.com/KordingLab/jupyter-vibecheck/blob/main/docs/0-Setup.ipynb) for details) you can use this element like so:

```html
<vibecheck-widget
    section-id="Web Component Demo"
    project="public_testbed"
    user-key="3zg0t05r"
    server="https://pmyvdlilci.execute-api.us-east-1.amazonaws.com/klab"
></vibecheck-widget>
```