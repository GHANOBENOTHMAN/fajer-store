
// ========== 3. معالجة نموذج تسجيل المستقل (Worker) ==========
const workerRegisterForm = document.getElementById('workerRegisterForm');
if (workerRegisterForm) {
    workerRegisterForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // العناصر
        const firstname = document.getElementById('firstname');
        const lastname = document.getElementById('lastname');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');
        const submitBtn = document.getElementById('submitBtn');

        // جمع المهارات المختارة
        const selectedSkills = [];
        document.querySelectorAll('input[name="skills"]:checked').forEach(checkbox => {
            selectedSkills.push(checkbox.value);
        });

        // تصفير الأخطاء السابقة
        [firstname, lastname, phone, email, password, confirmPassword].forEach(input => {
            const group = input.closest('.form-group');
            if (group) group.classList.remove('error');
        });
        document.getElementById('skillsError').style.display = 'none';

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

        // التحقق من المهارات
        if (selectedSkills.length === 0) {
            document.getElementById('skillsError').style.display = 'block';
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
            // إظهار حالة التحميل
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text').textContent = 'جاري الإنشاء...';
            submitBtn.querySelector('.fa-spinner').style.display = 'inline-block';

            try {
                const response = await fetch('/.netlify/functions/register-worker', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstname: firstname.value.trim(),
                        lastname: lastname.value.trim(),
                        phone: phoneVal,
                        email: email.value.trim(),
                        skills: selectedSkills
                        // Note: Password is NOT sent to plain DB for this demo, 
                        // usually we'd handle auth separately or hash it in backend. 
                        // For this step, we just store profile info.
                    }),
                });

                const result = await response.json();

                if (response.ok) {
                    showToast('تم التسجيل بنجاح!', 'تم إنشاء ملفك المهني وحفظه في قاعدة البيانات!', 'success');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
                } else {
                    throw new Error(result.message || 'حدث خطأ أثناء التسجيل');
                }

            } catch (error) {
                console.error('Error:', error);
                showToast('خطأ', error.message, 'error');
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').textContent = 'إنشاء حساب';
                submitBtn.querySelector('.fa-spinner').style.display = 'none';
            }
        } else {
            showToast('هناك خطأ في البيانات', 'يرجى مراجعة الحقول المطلوبة', 'error');
        }
    });
}
