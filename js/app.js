function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var supportedFunctions = Object.getOwnPropertyNames(window["Intl"]);

var isSupported = function isSupported(functionName) {
  return supportedFunctions.indexOf(functionName) > -1;
};

var functionNames = ["DateTimeFormat", "NumberFormat", "RelativeTimeFormat", "Collator", "ListFormat", "PluralRules", "Locale", "getCanonicalLocales"];

var page = React.createElement(
  React.Fragment,
  null,
  React.createElement(
    "div",
    { className: "jumbotron pb-2" },
    React.createElement(Title, null),
    React.createElement(BrowserInfo, null)
  ),
  React.createElement(
    "div",
    { className: "container" },
    React.createElement(Report, { functionNames: functionNames })
  )
);

// TODO -- user facing strings should be
// moved to an application string resource.

var APP_NAME = "Intl.js Support";

document.title = APP_NAME;

ReactDOM.render(page, document.getElementById('root'));

function FunctionLink(props) {
  var URL = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/" + props.name;
  var title = "Link to MDN doc on Intl." + props.name;
  return React.createElement(
    "a",
    { href: URL, target: "_blank", title: title },
    props.name
  );
}

function Report(properties) {
  var functionNames = properties.functionNames;
  console.debug("functionNames:", functionNames);

  var buildReport = function buildReport(names) {
    var CHECK_MARK = 0x2714;
    return functionNames.reduce(function (obj, name) {
      return Object.assign({}, obj, _defineProperty({}, name, isSupported(name) ? String.fromCharCode(CHECK_MARK) : ''));
    }, {});
  };

  var report = buildReport(functionNames);

  var tableRows = Object.keys(report).map(function (entry) {
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        React.createElement(FunctionLink, { name: entry })
      ),
      React.createElement(
        "td",
        { className: "text-center" },
        report[entry]
      )
    );
  });

  return React.createElement(
    "table",
    { className: "table table-md table-hover" },
    React.createElement(
      "thead",
      null,
      React.createElement(
        "th",
        null,
        "Intl Object"
      ),
      React.createElement(
        "th",
        { className: "text-center" },
        "Supported"
      )
    ),
    React.createElement(
      "tbody",
      null,
      tableRows
    )
  );
}

function Title() {
  return React.createElement(
    "h3",
    { className: "pb-3" },
    "Intl.js support in your browser"
  );
}

function BrowserInfo() {
  return React.createElement(
    "div",
    { className: "alert alert-light", role: "alert" },
    navigator.userAgent
  );
}