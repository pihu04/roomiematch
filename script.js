/* --- ROOMIEMATCH — Full Script --- */

(function () {
    'use strict';

    // ----- Quiz config: 5 steps, 3 options each -----
    const QUIZ_STEPS = [
        {
            question: 'When do you usually wake up?',
            options: ['Early bird (6–8 AM)', 'Night owl (10 AM+)', 'Flexible / depends'],
        },
        {
            question: 'How do you keep your room?',
            options: ['Minimalist & tidy', 'Organized chaos', 'Relaxed & lived-in'],
        },
        {
            question: 'What’s your social vibe?',
            options: ['Outgoing & social', 'Balanced', 'Quiet & focused'],
        },
        {
            question: 'Where do you study best?',
            options: ['Library only', 'Mix of both', 'Room only'],
        },
        {
            question: 'Weekends are for…',
            options: ['Exploring the city', 'Chilling at home', 'Mix of both'],
        },
    ];

    const VIBE_PROFILES = {
        earlyBird: {
            name: 'Early Bird',
            emoji: '🌅',
            desc: 'You thrive on routine and morning energy. Best matched with others who respect quiet hours and early lights-out.',
        },
        nightOwl: {
            name: 'Night Owl',
            emoji: '🦉',
            desc: 'Your best hours are after dark. You need a roomie who gets late-night study sessions and doesn’t mind dim lights.',
        },
        organizedHarmony: {
            name: 'Organized Harmony',
            emoji: '✨',
            desc: 'You love order and clarity. You’ll mesh best with someone who values a tidy space and clear boundaries.',
        },
        socialButterfly: {
            name: 'Social Butterfly',
            emoji: '🦋',
            desc: 'You’re outgoing and love having people around. Ideal match: someone who enjoys hosting and doesn’t need total silence.',
        },
        chillHomebody: {
            name: 'Chill Homebody',
            emoji: '🏠',
            desc: 'You prefer low-key vibes and cozy nights in. Your perfect roomie values the same calm, relaxed space.',
        },
        balancedExplorer: {
            name: 'Balanced Explorer',
            emoji: '⚖️',
            desc: 'You mix study and social, home and out. You need a flexible roomie who can go with the flow.',
        },
    };

    let quizAnswers = [];
    let currentStep = 0;

    // ----- DOM refs -----
    const statusPopup = document.getElementById('statusPopup');
    const claimForm = document.getElementById('claimForm');
    const quizModal = document.getElementById('quizModal');
    const quizContent = document.getElementById('quiz-content');
    const quizModalClose = document.getElementById('quizModalClose');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const waitlistFormInline = document.getElementById('waitlistFormInline');
    const waitlistEmail = document.getElementById('waitlistEmail');
    const waitlistUni = document.getElementById('waitlistUni');
    const toastContainer = document.getElementById('toastContainer');

    // ----- Delayed popup -----
    window.addEventListener('load', function () {
        setTimeout(function () {
            if (statusPopup) statusPopup.classList.add('is-open');
        }, 8000);
    });

    // ----- Popup: open / close -----
    window.closePopup = function () {
        if (statusPopup) statusPopup.classList.remove('is-open');
    };

    window.openWaitlistPopup = function () {
        if (statusPopup) statusPopup.classList.add('is-open');
    };

    // ----- Toast -----
    function showToast(message) {
        if (!toastContainer) return;
        var toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(function () {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 3000);
    }

    // ----- Popup form submit -----
    if (claimForm) {
        claimForm.addEventListener('submit', function (e) {
            e.preventDefault();
            showToast('Vibe checked! Your status is reserved.');
            closePopup();
        });
    }

    // ----- Inline waitlist form: .edu validation + toast -----
    if (waitlistFormInline) {
        waitlistFormInline.addEventListener('submit', function (e) {
            e.preventDefault();
            var email = waitlistEmail && waitlistEmail.value ? waitlistEmail.value.trim() : '';
            if (!email.toLowerCase().endsWith('.edu')) {
                showToast('Please use a university (.edu) email.');
                if (waitlistEmail) {
                    waitlistEmail.classList.add('error');
                    setTimeout(function () { waitlistEmail.classList.remove('error'); }, 2000);
                }
                return;
            }
            showToast("You're on the list! We'll be in touch.");
            waitlistFormInline.reset();
        });
    }

    // ----- Hamburger / mobile menu -----
    function openMobileMenu() {
        if (mobileMenu) mobileMenu.classList.add('is-open');
    }
    function closeMobileMenu() {
        if (mobileMenu) mobileMenu.classList.remove('is-open');
    }
    window.closeMobileMenu = closeMobileMenu;

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);

    // ----- Quiz: open modal -----
    window.openQuizModal = function () {
        currentStep = 0;
        quizAnswers = [];
        if (quizModal) quizModal.classList.add('is-open');
        renderQuizStep(0);
        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    function closeQuizModal() {
        if (quizModal) quizModal.classList.remove('is-open');
    }

    if (quizModalClose) quizModalClose.addEventListener('click', closeQuizModal);
    if (quizModal) {
        quizModal.addEventListener('click', function (e) {
            if (e.target === quizModal) closeQuizModal();
        });
    }

    function renderProgressDots(activeIndex) {
        var dots = [];
        for (var i = 0; i < 5; i++) {
            dots.push('<div class="dot' + (i === activeIndex ? ' active' : '') + '"></div>');
        }
        return '<div class="quiz-progress-dots">' + dots.join('') + '</div>';
    }

    function getVibeProfile() {
        // Simple scoring: map answer indices to traits, then pick profile
        var early = 0, night = 0, tidy = 0, social = 0, chill = 0, balanced = 0;
        if (quizAnswers[0] === 0) early++;
        if (quizAnswers[0] === 1) night++;
        if (quizAnswers[0] === 2) balanced++;
        if (quizAnswers[1] === 0) tidy++;
        if (quizAnswers[1] === 2) chill++;
        if (quizAnswers[2] === 0) social++;
        if (quizAnswers[2] === 2) chill++;
        if (quizAnswers[3] === 2) chill++;
        if (quizAnswers[4] === 0) social++;
        if (quizAnswers[4] === 1) chill++;
        if (quizAnswers[4] === 2) balanced++;

        if (early >= 1 && tidy >= 1) return VIBE_PROFILES.earlyBird;
        if (night >= 1) return VIBE_PROFILES.nightOwl;
        if (tidy >= 1 && social <= 1) return VIBE_PROFILES.organizedHarmony;
        if (social >= 2) return VIBE_PROFILES.socialButterfly;
        if (chill >= 2) return VIBE_PROFILES.chillHomebody;
        return VIBE_PROFILES.balancedExplorer;
    }

    function renderQuizStep(stepIndex) {
        if (stepIndex >= QUIZ_STEPS.length) {
            var profile = getVibeProfile();
            quizContent.style.opacity = '0';
            quizContent.style.transform = 'translateY(-10px)';
            setTimeout(function () {
                quizContent.innerHTML =
                    '<div class="quiz-result-screen">' +
                    '<h2 class="quiz-result-title">' + profile.emoji + ' ' + profile.name + '</h2>' +
                    '<p class="quiz-result-desc">' + profile.desc + '</p>' +
                    '<button type="button" class="quiz-retake" onclick="openQuizModal()">Retake Quiz</button>' +
                    '</div>';
                quizContent.style.opacity = '1';
                quizContent.style.transform = 'translateY(0)';
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }, 400);
            return;
        }

        var step = QUIZ_STEPS[stepIndex];
        var optionsHtml = step.options
            .map(function (opt, i) {
                return '<button type="button" class="quiz-btn-sheer" data-index="' + i + '" data-step="' + stepIndex + '">' + opt + '</button>';
            })
            .join('');

        var html =
            renderProgressDots(stepIndex) +
            '<p class="step-label">Step ' + (stepIndex + 1) + ' / 5</p>' +
            '<h2 class="quiz-question">' + step.question + '</h2>' +
            '<div class="quiz-options">' + optionsHtml + '</div>';

        quizContent.style.opacity = '0';
        quizContent.style.transform = 'translateY(-10px)';
        setTimeout(function () {
            quizContent.innerHTML = html;
            quizContent.style.opacity = '1';
            quizContent.style.transform = 'translateY(0)';

            var buttons = quizContent.querySelectorAll('.quiz-options .quiz-btn-sheer');
            buttons.forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var idx = parseInt(btn.getAttribute('data-index'), 10);
                    var st = parseInt(btn.getAttribute('data-step'), 10);
                    quizAnswers[st] = idx;
                    buttons.forEach(function (b) { b.classList.remove('selected'); });
                    btn.classList.add('selected');
                    setTimeout(function () {
                        currentStep = st + 1;
                        renderQuizStep(currentStep);
                    }, 350);
                });
            });
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }, 400);
    }

    // Re-init Lucide when new icons are added (e.g. after quiz step render)
    var observer = typeof MutationObserver !== 'undefined' && new MutationObserver(function () {
        if (typeof lucide !== 'undefined') lucide.createIcons();
    });
    if (observer && quizContent) {
        observer.observe(quizContent, { childList: true, subtree: true });
    }
})();
