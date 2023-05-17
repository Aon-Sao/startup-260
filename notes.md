## Git
Workflow is pull → work → add → commit → pull → push

## Markdown
Github's guide can be found [here](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## Environments
Production is the server, deploy using a shell script, develop and test locally.

## Server
[http://52.45.233.47/](http://52.45.233.47/)
ssh -i /home/lars/Documents/College/Term4S23/cs260/260awskeypairname.pem ubuntu@52.45.233.47

### Certificates
Needed for HTTPS. Let's Encrypt generates certificates. Caddy interfaces with that on my behalf. 

# Writing a Pitch
Lead with the motivation (what's the problem)
Give brief overview of the solution
Ask for money?

# Browsing local files
Is insecure, prefer to load over HTTPS. Serve it on localhost instead.

# HTML
<!DOCTYPE html> specifies HTML version 5, allowing the browser to not load a bunch of compatibilities.
The browser turns the HTML into a tree, the DOM, Document Object Model, and renders that.

A div takes up the whole width of the page
A span is inline, only as wide as the content
Try to be semantically expressive with choice of element, don't just use div
This is a way to label things:
```html
<figure>
<figcaption></figcaption>
<!-- content -->
</figure>
```

# CSS
The browser has a baseline stylesheet that I might want to delete, so that my css looks the same on all browsers.
Use @media to switch to column layout if mobile. Use a framework, like bootstrap or tailwind
`<img src="">` not `<img href="">`...

# JS
I'll have event listeners and invoke grep, awk, sed from JS.