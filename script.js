(function () {
  var m = String(location.pathname).match(/\/hc(?:\/[a-z]{2}(?:-[a-z]{2})?)?\/articles\/(\d+)/i);
  if (m && m[1] === '7595177751067') {
    location.replace('https://status.vanillasoft.com');
  }
})();


(function () {
  var remaps = {
"204429944": "204683350",
"360000895152": "204682390",
"24964291090843": "24952240537243",
"360038029652": "24952240537243",
"360040421032": "204429784",
"204409964": "25903871228187",
"360039590532": "25903871228187",
"360040744011": "204681330",
"360035104451": "360001675872",
"360059843631": "360044121711",
"360060553171": "360001655151",
"11500984377883": "360001655151",
"360039784431": "14090972163995",
"6626063102619": "13966031610651",
"204427494": "24410636508187",
"4415377476891": "24094262957723",
"360042107472": "14054673768347",
"204429754": "13836783075227",
"360043341832": "14121806138523",
"204682340": "14161054304283",
"360040317432": "204682340",
"204411344": "204682340",
"360041911512": "10569488199835",
"215321498": "220329568",
"204412124": "204683190",
"230870007": "4403667942939",
"115000073212": "204681360",
"204936484": "228794047",
"204931340": "229059728",
"204410184": "360001675872",
"204411294": "204682360",
"229752708": "218474457",
"204410424": "360001655151",
"204978950": "360020318491",
"204682150": "360020318491",
"360020866952": "204682340",
"360003527451": "360001655151",
"200846350": "360007035871"
  };
  if (!Object.keys(remaps).length) return;

  var href = String(location.href).toLowerCase();
  for (var oldId in remaps) {
    if (href.indexOf(oldId) !== -1) {
      location.replace("https://vanillasoft.zendesk.com/hc/en-us/articles/" + remaps[oldId]);
      return;
    }
  }
})();



function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function dontShowPopupAgain(element){
  var checked=$(element).prop("checked")
  console.log(checked)
  setCookie("hidepopup", 1, "18 Dec 2023 12:00:00 UTC")
  console.log(getCookie("hidepopup"))
}


$(document).ready(function () {

  // Show div html based on role
if (HelpCenter.user.role=="anonymous"){
 $("div.anonymous").show();
}

if (HelpCenter.user.role=="end_user"){
 $("div.end_user").show();
}

if (HelpCenter.user.role=="agent"){
 $("div.agent").show();
}

if (HelpCenter.user.role=="manager"){
 $("div.manager").show();
}
  
  // social share popups
  $(".share a").click(function (e) {
    e.preventDefault();
    window.open(this.href, "", "height = 500, width = 500");
  });

  // show form controls when the textarea receives focus or backbutton is used and value exists
  var $commentContainerTextarea = $(".comment-container textarea"),
    $commentContainerFormControls = $(".comment-form-controls, .comment-ccs");

  $commentContainerTextarea.one("focus", function () {
    $commentContainerFormControls.show();
  });

  if ($commentContainerTextarea.val() !== "") {
    $commentContainerFormControls.show();
  }

  // Expand Request comment form when Add to conversation is clicked
  var $showRequestCommentContainerTrigger = $(".request-container .comment-container .comment-show-container"),
    $requestCommentFields = $(".request-container .comment-container .comment-fields"),
    $requestCommentSubmit = $(".request-container .comment-container .request-submit-comment");

  $showRequestCommentContainerTrigger.on("click", function () {
    $showRequestCommentContainerTrigger.hide();
    $requestCommentFields.show();
    $requestCommentSubmit.show();
    $commentContainerTextarea.focus();
  });

  // Mark as solved button
  var $requestMarkAsSolvedButton = $(".request-container .mark-as-solved:not([data-disabled])"),
    $requestMarkAsSolvedCheckbox = $(".request-container .comment-container input[type=checkbox]"),
    $requestCommentSubmitButton = $(".request-container .comment-container input[type=submit]");

  $requestMarkAsSolvedButton.on("click", function () {
    $requestMarkAsSolvedCheckbox.attr("checked", true);
    $requestCommentSubmitButton.prop("disabled", true);
    $(this).attr("data-disabled", true).closest("form").submit();
  });

  // Change Mark as solved text according to whether comment is filled
  var $requestCommentTextarea = $(".request-container .comment-container textarea");

  $requestCommentTextarea.on("keyup", function () {
    if ($requestCommentTextarea.val() !== "") {
      $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-and-submit-translation"));
      $requestCommentSubmitButton.prop("disabled", false);
    } else {
      $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-translation"));
      $requestCommentSubmitButton.prop("disabled", true);
    }
  });

  // Disable submit button if textarea is empty
  if ($requestCommentTextarea.val() === "") {
    $requestCommentSubmitButton.prop("disabled", true);
  }

  // Submit requests filter form in the request list page
  $("#request-status-select, #request-organization-select")
    .on("change", function () {
      search();
    });

  // Submit requests filter form in the request list page
  $("#quick-search").on("keypress", function (e) {
    if (e.which === 13) {
      search();
    }
  });

  function search() {
    window.location.search = $.param({
      query: $("#quick-search").val(),
      status: $("#request-status-select").val(),
      organization_id: $("#request-organization-select").val()
    });
  }

  $(".header .icon-menu").on("click", function (e) {
    e.stopPropagation();
    var menu = document.getElementById("user-nav");
    var isExpanded = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", !isExpanded);
  });

  if ($("#user-nav").children().length === 0) {
    $(".header .icon-menu").hide();
  }

  // Submit organization form in the request page
  $("#request-organization select").on("change", function () {
    this.form.submit();
  });


  // Toggles expanded aria to collapsible elements
  $(".collapsible-nav, .collapsible-sidebar").on("click", function (e) {
    e.stopPropagation();
    var isExpanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !isExpanded);
  });

  // Wrap table in article content in table-responsive class
  $('.article-body').find('table').wrap('<div class="table-responsive"></div>');

  // Function to list categories in all templates
  function getData(count, callback, param) {
    var count = count ? count : 100;
    return $.ajax({
      url: '/api/v2/help_center/'+$('html').attr('lang').toLowerCase()+'/categories.json?per_page=' +
        count + param,
      type: 'GET',
      dataType: 'json',
      success: callback
    });
  };

  function createHtml(cb) {
    var navigationHtml = '';
    $.when(getData()).then(function (data) {
      $.each(data.categories, function (idx, itm) {
        navigationHtml += categorySidebarTemplate
          .replace('CAT-ID', itm.id)
          .replace('CAT-URL', itm.html_url)
          .replace('CAT-TITLE', itm.name)
          .replace('CAT-NAME', itm.name);
      });

      cb(navigationHtml);
    });
  }

  // Append html in DOM
  function domQuery(el) {

    var localCachedMenu = localStorage.getItem('navigation-menu'),
      localCachedUserRole = localStorage.getItem('userrole');
      localCachedLocale = localStorage.getItem('locale');
      locale = $('html').attr('lang').toLowerCase();

    if ((localCachedMenu) &&
      (HelpCenter.user.role == localCachedUserRole) &&
      (locale == localCachedLocale)) {
      $(el).html(localCachedMenu);
    };

    createHtml(function (html) {
      if ((!localCachedMenu) ||
        (HelpCenter.user.role != localCachedUserRole) ||
        (locale != localCachedLocale)) {
          $(el).html(html);
      };

      localStorage.setItem('userrole', HelpCenter.user.role);
      localStorage.setItem('navigation-menu', html);
      localStorage.setItem('locale', locale);
    });
  }

  // If multibrand search has more than 5 help centers or categories collapse the list
  const multibrandFilterLists = document.querySelectorAll(".multibrand-filter-list");
  Array.prototype.forEach.call(multibrandFilterLists, function(filter) {
    if (filter.children.length > 6) {
      // Display the show more button
      var trigger = filter.querySelector(".see-all-filters");
      trigger.setAttribute("aria-hidden", false);

      // Add event handler for click
      trigger.addEventListener("click", function(e) {
        e.stopPropagation();
        trigger.parentNode.removeChild(trigger);
        filter.classList.remove("multibrand-filter-list--collapsed")
      })
    }
  });

});

var $ = jQuery.noConflict();

// Load all necessary objects from Kyle Library
$(document).ready(function() {
  if (
    _templateName == "categories" ||
    _templateName == "sections" ||
    _templateName == "articles"
  ) {
    initMultiLevelMenu({
      htmlClass: "kyle-category-sidebar-menu",
      storageType: "session"
    });

    $("li.category-" + catID).addClass("active");
  }
  
  if (getCookie("hidepopup")==1){
    
    $("#bg-modal").hide()
  }
  else{
    $("#bg-modal").show()    
    
  }
});
 
document.addEventListener('DOMContentLoaded', function() {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
});


// When the user clicks on <div>, open the popup
function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}




document.addEventListener('DOMContentLoaded', function () {
  const input = document.querySelector('.search-full input[type="search"]');

  if (!input) return;

  const observer = new MutationObserver(() => {
    const dropdown = document.querySelector('.search-autocomplete');
    if (dropdown && input) {
      const inputRect = input.getBoundingClientRect();
      dropdown.style.position = 'absolute';
      dropdown.style.top = `${input.offsetTop + input.offsetHeight + 8}px`;
      dropdown.style.left = `${input.offsetLeft}px`;
      dropdown.style.width = `${input.offsetWidth}px`;
      dropdown.style.zIndex = '1000';
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});



// Prevent the page from loading "slightly scrolled" and stop auto-focus scrolling
(function () {
  // Stop the browser from restoring a previous scroll position
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // When the page is shown from bfcache, force to top
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) window.scrollTo(0, 0);
  });

  // After DOM is ready: blur any auto-focused fields (e.g., Zendesk search)
  document.addEventListener('DOMContentLoaded', function () {
    // Common Zendesk search input id is #query; also blur any element with [autofocus]
    var toBlur = [];
    var q = document.getElementById('query');
    if (q) toBlur.push(q);
    document.querySelectorAll('[autofocus]').forEach(function (el) { toBlur.push(el); });

    toBlur.forEach(function (el) { try { el.blur(); } catch (_) {} });

    // Ensure we start at the very top
    window.scrollTo(0, 0);
  });
})();





document.addEventListener('DOMContentLoaded', () => {
  const ACC_OPEN  = '- Click to collapse';
  const ACC_CLOSE = '- Click to expand';

  document.querySelectorAll('.accordion').forEach((acc, i) => {
    const panel = acc.nextElementSibling;
    if (!panel || !panel.classList.contains('panel')) return;

    // ARIA ids
    if (!panel.id) panel.id = `acc-panel-${i}`;
    if (!acc.id) acc.id = `acc-btn-${i}`;
    acc.setAttribute('aria-controls', panel.id);

    // Ensure there is a label element
    let label = acc.querySelector('.accordion-action');
    if (!label) {
      label = document.createElement('span');
      label.className = 'accordion-action';
      label.textContent = ACC_CLOSE;
      const p = acc.querySelector('p') || acc;
      p.appendChild(document.createTextNode(' '));
      p.appendChild(label);
    }

    // Initialize from aria-expanded or class
    const isOpen = acc.classList.contains('active') || acc.getAttribute('aria-expanded') === 'true';
    acc.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    label.textContent = isOpen ? ACC_OPEN : ACC_CLOSE;

    // Toggle on click/keyboard
    const toggle = () => {
      const open = acc.getAttribute('aria-expanded') === 'true';
      acc.setAttribute('aria-expanded', open ? 'false' : 'true');
      acc.classList.toggle('active', !open);
      label.textContent = !open ? ACC_OPEN : ACC_CLOSE;
    };

    acc.addEventListener('click', toggle);
    acc.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
});





document.addEventListener('DOMContentLoaded', () => {
  const upBtn = document.querySelector('.article-vote-up');
  const downBtn = document.querySelector('.article-vote-down');
  if (!upBtn || !downBtn) return;

  const upPanel = document.getElementById('up-vote-panel');
  const downPanel = document.getElementById('down-vote-panel');
  const jotTmpl = document.getElementById('jotform-template');

  function setDisabled(btn, disabled) {
    if (!btn) return;
    if (disabled) {
      btn.setAttribute('aria-disabled', 'true');
      btn.setAttribute('tabindex', '-1');
    } else {
      btn.removeAttribute('aria-disabled');
      btn.removeAttribute('tabindex');
    }
  }

  function syncState() {
    const upSelected = upBtn.getAttribute('aria-selected') === 'true' || upBtn.classList.contains('article-voted');
    const downSelected = downBtn.getAttribute('aria-selected') === 'true' || downBtn.classList.contains('article-voted');

    setDisabled(upBtn, upSelected);
    setDisabled(downBtn, downSelected);

    if (upPanel) upPanel.hidden = !upSelected;
    if (downPanel) {
      if (downSelected) {
        if (jotTmpl && !downPanel.dataset.loaded) {
          downPanel.appendChild(jotTmpl.content.cloneNode(true));
          downPanel.dataset.loaded = '1';
        }
        downPanel.hidden = false;
      } else {
        downPanel.hidden = true;
      }
    }
  }

  syncState();

  const mo = new MutationObserver(syncState);
  mo.observe(upBtn, { attributes: true, attributeFilter: ['aria-selected', 'class'] });
  mo.observe(downBtn, { attributes: true, attributeFilter: ['aria-selected', 'class'] });

  document.addEventListener('click', (e) => {
    const disabledTarget = e.target.closest('.article-vote[aria-disabled="true"]');
    if (disabledTarget) e.preventDefault();
  }, true);
});


document.addEventListener('DOMContentLoaded',function(){
  var toggles=document.querySelectorAll('.user-info > [role="button"]');
  function closeAll(except){
    document.querySelectorAll('.user-info[aria-expanded="true"], .user-info.is-open').forEach(function(ui){
      if(except&&ui===except)return;
      ui.setAttribute('aria-expanded','false');
      ui.classList.remove('is-open');
    });
  }
  toggles.forEach(function(t){
    var wrap=t.closest('.user-info');
    if(!wrap)return;
    if(!wrap.hasAttribute('aria-expanded')) wrap.setAttribute('aria-expanded','false');
    t.addEventListener('click',function(e){
      e.preventDefault();
      var open=wrap.getAttribute('aria-expanded')==='true';
      closeAll();
      wrap.setAttribute('aria-expanded', open?'false':'true');
      wrap.classList.toggle('is-open', !open);
    });
  });
  document.addEventListener('click',function(e){
    if(e.target.closest('.user-info')) return;
    closeAll();
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape') closeAll();
  });
});


const userInfo = document.querySelector('.user-info');
const toggle = userInfo.querySelector('[role="button"]');
const menu = userInfo.querySelector('.dropdown-menu');

function openMenu() {
  menu.removeAttribute('hidden');           // ensure it's renderable
  // force reflow so the transition starts from the closed state
  // (sometimes needed if your JS toggles quickly)
  // eslint-disable-next-line no-unused-expressions
  menu.offsetHeight; 
  userInfo.classList.add('is-open');
  userInfo.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  userInfo.classList.remove('is-open');
  userInfo.setAttribute('aria-expanded', 'false');

  // wait for the clip-path transition to finish, THEN hide
  const onEnd = (e) => {
    if (e.propertyName !== 'clip-path') return;
    menu.setAttribute('hidden', '');        // now it's truly hidden (a11y too)
    menu.removeEventListener('transitionend', onEnd);
  };
  menu.addEventListener('transitionend', onEnd, { once: true });
}

toggle.addEventListener('click', (e) => {
  e.preventDefault();
  const isOpen = userInfo.classList.contains('is-open');
  isOpen ? closeMenu() : openMenu();
});




// Kill native browser tooltips everywhere (robust)
(function () {
  // Remove `title` up the DOM tree (fast path on hover)
  function stripTitleFrom(node) {
    for (var el = node; el && el.nodeType === 1; el = el.parentElement) {
      if (el.hasAttribute('title')) {
        var t = el.getAttribute('title');
        if (t && !el.hasAttribute('aria-label')) el.setAttribute('aria-label', t);
        el.removeAttribute('title');
      }
      // Bootstrap-style tooltips sometimes use these:
      if (el.hasAttribute('data-original-title')) el.removeAttribute('data-original-title');
      if (el.getAttribute('data-toggle') === 'tooltip') el.removeAttribute('data-toggle');
    }
  }

  // 1) Intercept hover early (capture phase) and strip immediately
  window.addEventListener('mouseover', function (e) { stripTitleFrom(e.target); }, true);
  window.addEventListener('focus',    function (e) { stripTitleFrom(e.target); }, true);

  // 2) Initial sweep
  (function initialSweep() {
    document.querySelectorAll('[title], [data-original-title], [data-toggle="tooltip"]').forEach(stripTitleFrom);
  })();

  // 3) Watch for DOM changes AND title rewrites by scripts
  var mo = new MutationObserver(function (list) {
    for (var i = 0; i < list.length; i++) {
      var m = list[i];

      if (m.type === 'attributes' && (m.attributeName === 'title' || m.attributeName === 'data-original-title' || (m.attributeName === 'data-toggle' && m.target.getAttribute('data-toggle') === 'tooltip'))) {
        stripTitleFrom(m.target);
      }

      if (m.type === 'childList' && m.addedNodes && m.addedNodes.length) {
        for (var j = 0; j < m.addedNodes.length; j++) {
          var n = m.addedNodes[j];
          if (n.nodeType !== 1) continue;
          if (n.matches && (n.matches('[title], [data-original-title], [data-toggle="tooltip"]'))) stripTitleFrom(n);
          n.querySelectorAll && n.querySelectorAll('[title], [data-original-title], [data-toggle="tooltip"]').forEach(stripTitleFrom);
        }
      }
    }
  });

  mo.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['title', 'data-original-title', 'data-toggle']
  });
})();



