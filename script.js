
        // Toggle mobile menu navigation
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.className = 'fa-solid fa-bars text-2xl';
            } else {
                menuIcon.className = 'fa-solid fa-xmark text-2xl';
            }
        });

        // Toggle About Tab Panels
        const aboutContentElement = document.getElementById('about-tab-content');
        const tabs = {
            mission: 'To create an inclusive world where families have the tools, stability, and supportive environments required to break generational poverty.',
            vision: 'To see every child in Africa protected, nurtured, and provided high-quality development channels with maternal-family safety nets.',
            values: 'Solidarity, Radical Transparency, Action-Led Delivery, Compassionate Stewardship, and Long-Term community stability.'
        };

        function toggleAboutTab(tabKey) {
            // Update tabs visually
            document.getElementById('tab-mission').className = 'pb-3 border-b-2 border-transparent text-gray-400 hover:text-gray-600 transition-all';
            document.getElementById('tab-vision').className = 'pb-3 border-b-2 border-transparent text-gray-400 hover:text-gray-600 transition-all';
            document.getElementById('tab-values').className = 'pb-3 border-b-2 border-transparent text-gray-400 hover:text-gray-600 transition-all';

            document.getElementById(`tab-${tabKey}`).className = 'pb-3 border-b-2 active-tab transition-all';
            
            // Fade and update text content
            aboutContentElement.style.opacity = 0;
            setTimeout(() => {
                aboutContentElement.textContent = tabs[tabKey];
                aboutContentElement.style.opacity = 1;
            }, 150);
        }

        // Live Donation Widget Selector Action
        let selectedDonationAmount = 500; // default state
        const inputField = document.getElementById('custom-donation-input');
        const quickImpactStatement = document.getElementById('quick-impact-statement');

        function selectQuickDonation(amount) {
            selectedDonationAmount = amount;
            inputField.value = ''; // Reset custom input text field
            
            // Clear all focus states
            document.querySelectorAll('.donation-btn').forEach(btn => {
                btn.className = 'donation-btn py-3.5 px-2 rounded-2xl border-2 border-brandBlue/10 hover:border-brandBlue hover:bg-brandLightBlue/50 text-brandBlue font-extrabold transition-all text-sm md:text-base';
            });

            // Focus target btn state
            const targetBtn = document.getElementById(`btn-${amount}`);
            if (targetBtn) {
                targetBtn.className = 'donation-btn py-3.5 px-2 rounded-2xl border-2 border-brandOrange bg-brandLightOrange/50 text-brandOrange font-extrabold transition-all text-sm md:text-base';
            }

            updateQuickImpactText(amount);
        }

        function handleCustomInput() {
            // Clear selection buttons visually
            document.querySelectorAll('.donation-btn').forEach(btn => {
                btn.className = 'donation-btn py-3.5 px-2 rounded-2xl border-2 border-brandBlue/10 hover:border-brandBlue hover:bg-brandLightBlue/50 text-brandBlue font-extrabold transition-all text-sm md:text-base';
            });
            const customVal = parseFloat(inputField.value) || 0;
            selectedDonationAmount = customVal;
            updateQuickImpactText(customVal);
        }

        function updateQuickImpactText(amount) {
            let stmt = "Providing clean water & care items for children in need.";
            if (amount <= 20) {
                stmt = "Secures 2 basic hygiene and clinical healthcare kits for a child.";
            } else if (amount > 20 && amount <= 60) {
                stmt = "Provides full nutrition support for a household of 4 for over two weeks.";
            } else if (amount > 60 && amount <= 200) {
                stmt = "Secures complete elementary education books and educational items for 5 girls.";
            } else if (amount > 200) {
                stmt = "Supports an entire community with community-level water filtration tools!";
            }
            quickImpactStatement.textContent = stmt;
        }

        // Trigger interactive mock payment modal (Do not use standard prompt/alert)
        function triggerMockPayment() {
            if (selectedDonationAmount <= 0) {
                inputField.focus();
                return;
            }
            // Dynamic insertion of mock transaction feedback
            const feedbackContainer = document.createElement('div');
            feedbackContainer.id = 'mock-payment-overlay';
            feedbackContainer.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4';
            feedbackContainer.innerHTML = `
                <div class="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl border border-gray-100 transform scale-95 transition-all duration-300">
                    <div class="w-16 h-16 bg-brandLightGreen text-brandGreen text-3xl rounded-full flex items-center justify-center mx-auto">
                        <i class="fa-solid fa-heart-circle-check"></i>
                    </div>
                    <div class="space-y-2">
                        <h4 class="text-xl font-bold text-gray-900">Transaction Simulated</h4>
                        <p class="text-xs text-gray-500">Your mock donation of <span class="text-brandOrange font-black">$${selectedDonationAmount}</span> has been processed securely. In production, this ties into payment gateways like Stripe or Chapa.</p>
                    </div>
                    <button onclick="closeMockPayment()" class="w-full py-3 bg-brandBlue hover:bg-blue-700 text-white font-bold rounded-xl transition-all">
                        Excellent, Close
                    </button>
                </div>
            `;
            document.body.appendChild(feedbackContainer);
        }

        function closeMockPayment() {
            const overlay = document.getElementById('mock-payment-overlay');
            if (overlay) overlay.remove();
        }

        // Live calculation slider algorithm
        function calculateImpact(amount) {
            document.getElementById('slider-val-display').textContent = `${amount} ETB`;
            
            // Algorithms mapping dollars to metrics
            const waterVal = Math.round(amount * 5);
            const mealsVal = Math.round(amount * 0.2);
            const medKitsVal = Math.ceil(amount / 50);

            document.getElementById('calc-water').textContent = `${waterVal.toLocaleString()} Liters`;
            document.getElementById('calc-meals').textContent = `${mealsVal} Meals`;
            document.getElementById('calc-meds').textContent = `${medKitsVal} Families`;
        }

        // Dynamic Testimonials
        const testimonials = [
            {
                author: "Marta Alene",
                role: "Community Leader, Addis Ababa Hub",
                quote: "\"Thanks to the community tools and direct help provided by Addis Africa, 15 families in our district now have running water and support systems.\""
            },
            {
                author: "Kaleb Tesfaye",
                role: "Primary School Administrator",
                quote: "\"The support Addis Africa provides directly affects children's mental readiness. Attendance has surged from 40% to 92% because of regular feeding programs.\""
            },
            {
                author: "biruke ",
                role: "Global Partner Coordinator",
                quote: "\"Working with this team is a dream. Their transparency, active local coordinates, and execution values match perfectly with our corporate metrics.\""
            }
        ];

        let currentTestimonialIndex = 0;
        const slideContainer = document.getElementById('testimonial-slide');
        const authorEl = document.getElementById('testimonial-author');
        const roleEl = document.getElementById('testimonial-role');
        const quoteEl = document.getElementById('testimonial-quote');

        function updateTestimonial() {
            slideContainer.style.opacity = 0;
            setTimeout(() => {
                const active = testimonials[currentTestimonialIndex];
                authorEl.textContent = active.author;
                roleEl.textContent = active.role;
                quoteEl.textContent = active.quote;
                slideContainer.style.opacity = 1;
            }, 150);
        }

        function nextTestimonial() {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
            updateTestimonial();
        }

        function prevTestimonial() {
            currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
            updateTestimonial();
        }

        // Form submission behavior
        function handleFormSubmission(event) {
            event.preventDefault();
            const banner = document.getElementById('form-status-banner');
            banner.classList.remove('hidden');
            event.target.reset(); // clear fields
            setTimeout(() => {
                banner.classList.add('hidden');
            }, 6000);
        }

        // Mock newsletter notification toast
        function triggerNewsletterAlert() {
            const container = document.createElement('div');
            container.id = 'newsletter-toast';
            container.className = 'fixed bottom-5 right-5 z-[100] bg-darkBg border border-white/10 text-white rounded-2xl p-4 shadow-2xl flex items-center gap-3 max-w-sm transform translate-y-2 opacity-0 transition-all duration-300';
            container.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-brandOrange/20 text-brandOrange flex items-center justify-center text-sm shrink-0">
                    <i class="fa-solid fa-bell"></i>
                </div>
                <div class="text-xs">
                    <p class="font-bold">Subscription active</p>
                    <p class="text-gray-400 mt-0.5">Mock Subscription added. You will now receive regional operations reports.</p>
                </div>
            `;
            document.body.appendChild(container);
            
            // Animation trigger
            setTimeout(() => {
                container.className = 'fixed bottom-5 right-5 z-[100] bg-darkBg border border-white/10 text-white rounded-2xl p-4 shadow-2xl flex items-center gap-3 max-w-sm transform translate-y-0 opacity-100 transition-all duration-300';
            }, 50);

            // Close after 4s
            setTimeout(() => {
                container.className = 'fixed bottom-5 right-5 z-[100] bg-darkBg border border-white/10 text-white rounded-2xl p-4 shadow-2xl flex items-center gap-3 max-w-sm transform translate-y-2 opacity-0 transition-all duration-300';
                setTimeout(() => container.remove(), 300);
            }, 4000);
        }

        // Set initial state
        selectQuickDonation(50);
