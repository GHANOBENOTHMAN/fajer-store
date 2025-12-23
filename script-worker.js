
// ========== 3. معالجة نموذج تسجيل المستقل (Worker) ==========
const workerRegisterForm = document.getElementById('workerRegisterForm');
if (workerRegisterForm) {
    workerRegisterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // العناصر
        const firstname = document.getElementById('firstname');
        const lastname = document.getElementById('lastname');
        const profession = document.getElementById('profession');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');
        const submitBtn = document.getElementById('submitBtn');

        // تصفير الأخطاء السابقة
        [firstname, lastname, profession, phone, email, password, confirmPassword].forEach(input => {
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

        // التحقق من المهنة (إضافي للمستقل)
        if (!profession.value.trim()) {
            profession.closest('.form-group').classList.add('error');
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
                showToast('تم التسجيل بنجاح!', 'تم إنشاء ملفك المهني، بالتوفيق!', 'success');

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }, 1500);
        } else {
            showToast('هناك خطأ في البيانات', 'يرجى مراجعة الحقول المطلوبة', 'error');
        }
    });
}
