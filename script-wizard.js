
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
