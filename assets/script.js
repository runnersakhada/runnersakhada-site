// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-question');
    if (!q) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        if (openItem !== item) openItem.classList.remove('open');
      });
      item.classList.toggle('open', !isOpen);
    });
  });

  // Testimonial carousel (left/right scroll)
  document.querySelectorAll('.carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var prevBtn = carousel.querySelector('.carousel-prev');
    var nextBtn = carousel.querySelector('.carousel-next');
    if (!track) return;

    function scrollByCards(direction) {
      var card = track.querySelector('.testimonial-card');
      if (!card) return;
      var cardWidth = card.getBoundingClientRect().width;
      var gap = 24;
      var visibleCards = Math.round(track.clientWidth / (cardWidth + gap)) || 1;
      track.scrollBy({ left: direction * (cardWidth + gap) * visibleCards, behavior: 'smooth' });
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { scrollByCards(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { scrollByCards(1); });
  });

  // Testimonial "Read more" toggle
  document.querySelectorAll('.testimonial-card p.quote').forEach(function (quote) {
    // Use text length as proxy since off-screen carousel cards have 0 clientHeight
    if (quote.textContent.length > 200) {
      var btn = document.createElement('button');
      btn.className = 'read-more';
      btn.textContent = 'Read more';
      quote.insertAdjacentElement('afterend', btn);
      btn.addEventListener('click', function () {
        var card = quote.closest('.testimonial-card');
        var isExpanded = card.classList.toggle('expanded');
        btn.textContent = isExpanded ? 'Read less' : 'Read more';
      });
    }
  });

  // Native form handling
  document.querySelectorAll('form[data-native-form]').forEach(function (form) {
    var gsheetUrl = form.getAttribute('data-gsheet-url');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var successBox = form.parentElement.querySelector('.form-success');
      var submitBtn = form.querySelector('button[type="submit"]');

      // Forms wired to a Google Sheet endpoint (Apps Script web app)
      if (gsheetUrl) {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Submitting...';
        }

        var formData = new FormData(form);

        // Apps Script web apps don't return CORS headers, so the response
        // is opaque (mode: 'no-cors') -- we can't read success/failure from
        // it directly, but a resolved fetch means the request was sent.
        fetch(gsheetUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        })
          .then(function () {
            if (successBox) {
              successBox.style.display = 'block';
              successBox.textContent = "Thanks! We've received your details and will reach out shortly.";
              successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            form.reset();
          })
          .catch(function () {
            if (successBox) {
              successBox.style.display = 'block';
              successBox.style.background = 'rgba(226,75,74,0.12)';
              successBox.style.borderColor = '#E24B4A';
              successBox.style.color = '#791F1F';
              successBox.textContent = "Something went wrong sending your details. Please try again or email us directly.";
              successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          })
          .finally(function () {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = 'Submit';
            }
          });

        return;
      }

      // Forms not yet wired to a backend -- local demo confirmation only
      if (successBox) {
        successBox.style.display = 'block';
        successBox.textContent = "Thanks! We've received your details and will reach out shortly.";
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
      // TODO: wire this up to your form backend of choice
      // (Formspree, Netlify Forms, a mailto link, or a custom endpoint)
      // once you're ready to go live.
    });
  });
});
