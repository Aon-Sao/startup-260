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

<table>
<thead>
<tr>
<th>Element</th>
<th>Meaning</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>form</code></td>
<td>Input container and submission</td>
<td><code>&lt;form action="form.html" method="post"&gt;</code></td>
</tr>
<tr>
<td><code>fieldset</code></td>
<td>Labeled input grouping</td>
<td><code>&lt;fieldset&gt; ... &lt;/fieldset&gt;</code></td>
</tr>
<tr>
<td><code>input</code></td>
<td>Multiple types of user input</td>
<td><code>&lt;input type="" /&gt;</code></td>
</tr>
<tr>
<td><code>select</code></td>
<td>Selection dropdown</td>
<td><code>&lt;select&gt;&lt;option&gt;1&lt;/option&gt;&lt;/select&gt;</code></td>
</tr>
<tr>
<td><code>optgroup</code></td>
<td>Grouped selection dropdown</td>
<td><code>&lt;optgroup&gt;&lt;option&gt;1&lt;/option&gt;&lt;/optgroup&gt;</code></td>
</tr>
<tr>
<td><code>option</code></td>
<td>Selection option</td>
<td><code>&lt;option selected&gt;option2&lt;/option&gt;</code></td>
</tr>
<tr>
<td><code>textarea</code></td>
<td>Multiline text input</td>
<td><code>&lt;textarea&gt;&lt;/textarea&gt;</code></td>
</tr>
<tr>
<td><code>label</code></td>
<td>Individual input label</td>
<td><code>&lt;label for="range"&gt;Range: &lt;/label&gt;</code></td>
</tr>
<tr>
<td><code>output</code></td>
<td>Output of input</td>
<td><code>&lt;output for="range"&gt;0&lt;/output&gt;</code></td>
</tr>
<tr>
<td><code>meter</code></td>
<td>Display value with a known range</td>
<td><code>&lt;meter min="0" max="100" value="50"&gt;&lt;/meter&gt;</code></td>
</tr>
</tbody>
</table>