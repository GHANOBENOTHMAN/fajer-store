// فجر - التفاعلية الأساسية

document.addEventListener('DOMContentLoaded', function () {
    // تأثيرات التمرير على البطاقات
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', function () {
            const title = this.querySelector('.category-title').textContent;
            console.log('تم النقر على قسم: ' + title);
        });
    });

    // زر التسجيل
    // const registerBtn = document.querySelector('.register-btn');
    // if (registerBtn) {
    //     registerBtn.addEventListener('click', function (e) {
    //          // Allow default link behavior
    //     });
    // }

    // زر تسجيل الدخول
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('click', function () {
        alert('صفحة تسجيل الدخول قيد التطوير');
    });

    // البحث
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    searchBtn.addEventListener('click', function () {
        const query = searchInput.value.trim();
        if (query) {
            console.log('البحث عن: ' + query);
            alert('البحث عن: ' + query + '\nميزة البحث قيد التطوير');
        }
    });

    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    // قائمة اللغات المنسدلة
    const langDropdown = document.querySelector('.language-dropdown');
    const currentLang = document.getElementById('currentLang');
    const langOptions = document.getElementById('langOptions');
    const langOptionButtons = document.querySelectorAll('.lang-option');

    // فتح/إغلاق القائمة
    currentLang.addEventListener('click', function (e) {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function (e) {
        if (!langDropdown.contains(e.target)) {
            langDropdown.classList.remove('active');
        }
    });

    // تبديل اللغة
    langOptionButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const lang = this.dataset.lang;
            const flagSrc = this.querySelector('.flag-icon-small').src;
            const langName = this.querySelector('.lang-name').textContent;

            // تحديث اللغة المختارة
            currentLang.querySelector('.flag-icon-small').src = flagSrc;
            currentLang.querySelector('.lang-name-selected').textContent = langName;

            // إغلاق القائمة
            langDropdown.classList.remove('active');

            console.log('تم تبديل اللغة إلى: ' + langName);
            alert('تم تبديل اللغة إلى: ' + langName + '\nميزة تعدد اللغات قيد التطوير');
        });
    });

    // تأثيرات الرسوم المتحركة عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // مراقبة بطاقات الميزات
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    console.log('🌅 مرحباً بك في متجر فجر!');
});

// ========== 2. معالجة نموذج تسجيل المستخدم ==========
const userRegisterForm = document.getElementById('userRegisterForm');
if (userRegisterForm) {
    userRegisterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // العناصر
        const firstname = document.getElementById('firstname');
        const lastname = document.getElementById('lastname');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');
        const submitBtn = document.getElementById('submitBtn');

        // تصفير الأخطاء السابقة
        [firstname, lastname, phone, email, password, confirmPassword].forEach(input => {
            const group = input.closest('.form-group');
            if (group) group.classList.remove('error');
        });

        let isValid = true;

        // التحقق من الاسم
        if (!firstname.value.trim()) {
            firstname.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // التحقق من اللقب
        if (!lastname.value.trim()) {
            lastname.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // التحقق من رقم الهاتف الجزائري
        // يقبل: 05, 06, 07 متبوعاً بـ 8 أرقام (إجمالي 10)
        // أو 5, 6, 7 متبوعاً بـ 8 أرقام (إجمالي 9) باعتبار أن البادئة +213 موجودة
        // سنفترض أن المستخدم يدخل الرقم بدون الصفر الأول أو معه، لكن يجب أن يكون تنسيقاً صحيحاً
        const phoneVal = phone.value.replace(/\s/g, ''); // إزالة المسافات
        const dzPhoneRegex = /^(00213|\+213|0)?(5|6|7)[0-9]{8}$/;

        if (!dzPhoneRegex.test(phoneVal)) {
            phone.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // التحقق من البريد
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // التحقق من كلمة المرور
        if (password.value.length < 6) {
            password.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // التحقق من تطابق كلمة المرور
        if (password.value !== confirmPassword.value) {
            confirmPassword.closest('.form-group').classList.add('error');
            isValid = false;
        }

        if (isValid) {
            // محاكاة الإرسال
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text').textContent = 'جاري الإنشاء...';
            submitBtn.querySelector('.fa-spinner').style.display = 'inline-block';

            setTimeout(() => {
                showToast('تم إنشاء الحساب بنجاح!', 'مرحباً بك في مجتمع فجر!', 'success');

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }, 1500);
        } else {
            showToast('هناك خطأ في البيانات', 'يرجى التأكد من ملء جميع الحقول بشكل صحيح', 'error');
        }
    });
}

// دالة إظهار الإشعار (Toast)
function showToast(title, message, type = 'success') {
    // إنشاء العنصر
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;

    const icon = type === 'success' ? 'check' : 'times';

    toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-${icon}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
        `;

    document.body.appendChild(toast);

    // إظهار الإشعار
    setTimeout(() => toast.classList.add('show'), 100);

    // إخفاء وإزالة بعد فترة
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// ========== 3. معالجة نموذج تسجيل المستقل (متعدد الخطوات) ==========
const workerRegisterForm = document.getElementById('workerRegisterForm');

if (workerRegisterForm) {
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn');
    const finalSubmitBtn = document.getElementById('submitBtn');
    const skillsAccordion = document.getElementById('skillsAccordion');

    // التعامل مع الأكورديون (Accordion Logic)
    if (skillsAccordion) {
        const headers = skillsAccordion.querySelectorAll('.accordion-header');

        headers.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const icon = header.querySelector('i');

                // إغلاق الآخرين (اختياري - إذا أردنا فتح واحد فقط في كل مرة)
                // headers.forEach(h => {
                //     if(h !== header) {
                //         h.classList.remove('active');
                //         h.nextElementSibling.classList.remove('open');
                //     }
                // });

                header.classList.toggle('active');
                content.classList.toggle('open');
            });
        });
    }

    // زر التالي (من الخطوة 1 إلى 2)
    nextBtn.addEventListener('click', function () {
        // التحقق من الخطوة 1
        const firstname = document.getElementById('firstname');
        const lastname = document.getElementById('lastname');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');

        // تصفير الأخطاء
        [firstname, lastname, phone, email, password, confirmPassword].forEach(input => {
            const group = input.closest('.form-group');
            if (group) group.classList.remove('error');
        });

        let isValid = true;

        // التحقق من الاسم
        if (!firstname.value.trim()) {
            firstname.closest('.form-group').classList.add('error');
            isValid = false;
        }
        if (!lastname.value.trim()) {
            lastname.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // التحقق من رقم الهاتف الجزائري
        const phoneVal = phone.value.replace(/\s/g, '');
        const dzPhoneRegex = /^(00213|\+213|0)?(5|6|7)[0-9]{8}$/;
        if (!dzPhoneRegex.test(phoneVal)) {
            phone.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // التحقق من البريد
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // التحقق من كلمة المرور
        if (password.value.length < 6) {
            password.closest('.form-group').classList.add('error');
            isValid = false;
        }
        if (password.value !== confirmPassword.value) {
            confirmPassword.closest('.form-group').classList.add('error');
            isValid = false;
        }

        if (isValid) {
            // الانتقال للخطوة التالية
            step1.style.display = 'none';
            step2.style.display = 'block';
            window.scrollTo(0, 0); // الصعود للأعلى
        } else {
            showToast('هناك حقول ناقصة', 'يرجى إكمال بياناتك الشخصية أولاً', 'error');
        }
    });

    // زر العودة (من الخطوة 2 إلى 1)
    backBtn.addEventListener('click', function () {
        step2.style.display = 'none';
        step1.style.display = 'block';
    });

    // إرسال النموذج النهائي (الخطوة 2)
    workerRegisterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // التحقق من اختيار مهارة واحدة على الأقل
        const checkedSkills = document.querySelectorAll('input[name="skills"]:checked');
        const skillsError = document.getElementById('skillsError');

        if (checkedSkills.length === 0) {
            skillsError.style.display = 'block';
            showToast('تنبيه', 'يجب اختيار مهارة واحدة على الأقل', 'error');
            return;
        }

        skillsError.style.display = 'none';

        // محاكاة الإرسال
        finalSubmitBtn.disabled = true;
        finalSubmitBtn.querySelector('.btn-text').textContent = 'جاري الإنشاء...';
        finalSubmitBtn.querySelector('.fa-spinner').style.display = 'inline-block';

        // تجميع المهارات المختارة للعرض (للمحاكاة فقط)
        const skillsList = Array.from(checkedSkills).map(cb => cb.value).join(', ');
        console.log('المهارات المختارة:', skillsList);

        setTimeout(() => {
            showToast('تم التسجيل بنجاح!', 'تم حفظ ملفك ومهاراتك بنجاح!', 'success');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }, 1500);
    });
}
