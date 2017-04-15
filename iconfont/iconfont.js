;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-cart-active" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M329.194 872.382c-39.985 0-72.38 32.393-72.38 72.378 0 39.994 32.393 72.381 72.38 72.381 39.994 0 72.386-32.387 72.386-72.381 0-39.983-32.355-72.378-72.386-72.378v0 0zM835.865 872.382c-39.993 0-72.38 32.393-72.38 72.378 0 39.994 32.387 72.381 72.38 72.381 39.994 0 72.381-32.387 72.381-72.381 0-39.983-32.355-72.378-72.381-72.378v0 0zM990.002 144.81c-18.493-20.886-43.9-32.214-71.55-32.214h-725.149l-2.572-14.732c-6.334-52.655-52.692-93.838-105.529-93.838h-45.524c-20.020 0-36.193 16.174-36.193 36.191 0 20.013 16.175 36.187 36.193 36.187h45.524c15.742 0 31.814 14.332 33.943 31.956l34.963 201.871 61.379 432.158c6.367 52.655 52.223 94.018 104.375 94.018h588.384c20.014 0 36.193-16.179 36.193-36.189 0-20.013-16.179-36.189-36.193-36.189h-588.385c-15.418 0-30.582-14.265-32.61-31.051l-6.007-42.235 574.196-35.508c52.114 0 97.97-41.291 104.123-92.028l57.035-326.115c4.235-34.85-5.46-68.437-26.595-92.281v0zM990.002 144.81z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)