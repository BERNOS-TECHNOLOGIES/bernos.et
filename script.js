document.documentElement.classList.add('js-enabled');

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
}

const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');
const contactSupport = document.querySelector('.contact-support');

searchButton.addEventListener('click', function() {
    searchInput.classList.toggle('active');
    searchButton.classList.toggle('active');
    
    if (searchInput.classList.contains('active')) {
        contactSupport.style.opacity = '0';
        contactSupport.style.visibility = 'hidden';
        searchInput.focus();
    } else {
        contactSupport.style.opacity = '1';
        contactSupport.style.visibility = 'visible';
    }
});

document.addEventListener('click', function(event) {
    const isClickInside = searchButton.contains(event.target) || searchInput.contains(event.target);
    
    if (!isClickInside && searchInput.classList.contains('active')) {
        searchInput.classList.remove('active');
        searchButton.classList.remove('active');
        contactSupport.style.opacity = '1';
        contactSupport.style.visibility = 'visible';
    }
});

searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        console.log('Searching for:', this.value);
        alert('Searching for: ' + this.value);
        this.value = '';
    }
});

const discoverArrow = document.querySelector('.discover-arrow');

discoverArrow.addEventListener('click', function() {
    const nextSection = document.querySelector('.hero').nextElementSibling;
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
});

const arrowElement = document.querySelector('.discover-arrow');
if (arrowElement) {
    document.querySelector('.hero').addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        
        arrowElement.style.transform = `rotate(${angle + 270}deg)`;
    });

    document.querySelector('.hero').addEventListener('mouseleave', function() {
        arrowElement.style.transform = 'rotate(180deg)'; // Default to pointing up instead of down
    });
}

const projectsSlider = document.querySelector('.projects-slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

if (projectsSlider && prevButton && nextButton) {
    prevButton.addEventListener('click', () => {
        projectsSlider.scrollBy({
            left: -380,
            behavior: 'smooth'
        });
    });

    nextButton.addEventListener('click', () => {
        projectsSlider.scrollBy({
            left: 380,
            behavior: 'smooth'
        });
    });
}

const stats = document.querySelectorAll('.stat-number');

const animateStats = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const count = 0;
        const time = 2000;
        const step = target / (time / 30);
        
        let current = 0;
        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                clearInterval(counter);
                stat.textContent = target + '+';
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 30);
    });
};

if (stats.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (document.querySelector('.stats-container')) {
        observer.observe(document.querySelector('.stats-container'));
    }
}

const teamTrack = document.querySelector('.team-track');
if (teamTrack) {
    const members = document.querySelectorAll('.team-member');
    members.forEach(member => {
        const clone = member.cloneNode(true);
        teamTrack.appendChild(clone);
    });
}

function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                if (entry.target.classList.contains('category-item')) {
                    const icon = entry.target.querySelector('.category-icon');
                    const name = entry.target.querySelector('.category-name');
                    const count = entry.target.querySelector('.category-count');
                    
                    if (icon) setTimeout(() => icon.classList.add('active'), 100);
                    if (name) setTimeout(() => name.classList.add('active'), 200);
                    if (count) setTimeout(() => count.classList.add('active'), 300);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('js-enabled');
    
    handleScrollAnimations();
    
    const discoverMore = document.querySelector('.discover-more');
    const discoverCircleBg = document.querySelector('.discover-circle-bg');

    if (discoverCircleBg) {
        setTimeout(() => {
            discoverCircleBg.style.animation = 'pulse-circle 2s infinite';
        }, 2000);
    }

    if (discoverMore) {
        discoverMore.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 150);
            
            const nextSection = document.querySelector('.hero').nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            }
        });
    }

    initFaqToggle();

    initServiceOrder();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required')) {
                    if (this.value.trim() === '') {
                        this.classList.add('invalid');
                        this.classList.remove('valid');
                    } else {
                        this.classList.add('valid');
                        this.classList.remove('invalid');
                    }
                }
            });
            
            input.addEventListener('focus', function() {
                this.classList.remove('invalid');
            });
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    animatedElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'none';
        element.style.visibility = 'visible';
    });
    
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.style.background = 'rgba(30, 30, 46, 0.7)';
        card.style.backdropFilter = 'blur(10px)';
        card.style.borderRadius = '16px';
        card.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        card.style.padding = '30px';
        card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    });
    
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(button => {
        button.style.display = 'inline-block';
        button.style.padding = '12px 30px';
        button.style.borderRadius = '50px';
        button.style.fontFamily = "'Space Grotesk', sans-serif";
        button.style.fontWeight = '600';
        button.style.textDecoration = 'none';
        button.style.textAlign = 'center';
        button.style.background = 'linear-gradient(135deg, #6c5ce7, #a29bfe)';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.boxShadow = '0 5px 15px rgba(108, 92, 231, 0.3)';
    });
    
    const secondaryButtons = document.querySelectorAll('.btn-secondary');
    secondaryButtons.forEach(button => {
        button.style.display = 'inline-block';
        button.style.padding = '12px 30px';
        button.style.borderRadius = '50px';
        button.style.fontFamily = "'Space Grotesk', sans-serif";
        button.style.fontWeight = '600';
        button.style.textDecoration = 'none';
        button.style.textAlign = 'center';
        button.style.background = 'transparent';
        button.style.color = '#ffffff';
        button.style.border = '2px solid #6c5ce7';
    });
    
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.fontFamily = "'Space Grotesk', sans-serif";
        title.style.fontSize = '2.5rem';
        title.style.fontWeight = '700';
        title.style.marginBottom = '15px';
        title.style.background = 'linear-gradient(135deg, #ffffff, #aaaaaa)';
        title.style.webkitBackgroundClip = 'text';
        title.style.webkitTextFillColor = 'transparent';
    });
    
    const sectionSubtitles = document.querySelectorAll('.section-subtitle');
    sectionSubtitles.forEach(subtitle => {
        subtitle.style.fontSize = '1.1rem';
        subtitle.style.color = '#aaaaaa';
        subtitle.style.maxWidth = '700px';
        subtitle.style.margin = '0 auto';
    });
    
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        pageTitle.style.fontFamily = "'Space Grotesk', sans-serif";
        pageTitle.style.fontSize = '3.5rem';
        pageTitle.style.fontWeight = '700';
        pageTitle.style.marginBottom = '20px';
        pageTitle.style.background = 'linear-gradient(135deg, #6c5ce7, #a29bfe)';
        pageTitle.style.webkitBackgroundClip = 'text';
        pageTitle.style.webkitTextFillColor = 'transparent';
    }
    
    const pageSubtitle = document.querySelector('.page-subtitle');
    if (pageSubtitle) {
        pageSubtitle.style.fontSize = '1.2rem';
        pageSubtitle.style.color = '#aaaaaa';
        pageSubtitle.style.maxWidth = '700px';
        pageSubtitle.style.margin = '0 auto';
    }
});


function initPageScrollAnimations() {
    const scrollElements = document.querySelectorAll('.section-header, .glass-card, .btn-primary, .btn-secondary');
    
    scrollElements.forEach((element, index) => {
        if (element.classList.contains('section-header')) {
            element.classList.add('scroll-fade-in');
        } else if (index % 3 === 0) {
            element.classList.add('scroll-fade-left');
        } else if (index % 3 === 1) {
            element.classList.add('scroll-fade-right');
        } else {
            element.classList.add('scroll-scale');
        }
    });
    
    const gridItems = document.querySelectorAll('.team-member, .value-card, .location-card, .leader-card');
    gridItems.forEach(item => {
        item.classList.add('stagger-item');
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    const allAnimElements = document.querySelectorAll('.scroll-fade-in, .scroll-fade-left, .scroll-fade-right, .scroll-scale, .stagger-item');
    allAnimElements.forEach(element => {
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initPageScrollAnimations();
    
    const teamTrack = document.querySelector('.team-track');
    if (teamTrack) {
        const members = document.querySelectorAll('.team-member');
        members.forEach(member => {
            const clone = member.cloneNode(true);
            teamTrack.appendChild(clone);
        });
    }
});

function initFaqToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        console.log('FAQ items found:', faqItems.length);
        
        faqItems.forEach(item => {
            const answer = item.querySelector('.faq-answer');
            if (answer) {
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.padding = '0 20px 20px';
                } else {
                    answer.style.maxHeight = '0';
                    answer.style.padding = '0 20px';
                }
            }
        });
        
        faqItems.forEach(item => {
            item.addEventListener('click', function(e) {
                console.log('FAQ item clicked');
                
                const isActive = this.classList.toggle('active');
                
                const answer = this.querySelector('.faq-answer');
                
                if (answer) {
                    if (isActive) {
                        console.log('Opening FAQ item');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        answer.style.padding = '0 20px 20px';
                    } else {
                        console.log('Closing FAQ item');
                        answer.style.maxHeight = '0';
                        answer.style.padding = '0 20px';
                    }
                }
                
                faqItems.forEach(otherItem => {
                    if (otherItem !== this && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                            otherAnswer.style.padding = '0 20px';
                        }
                    }
                });
            });
        });
        
        faqItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            });
        });
    } else {
        console.log('No FAQ items found');
    }
}

function initServiceOrder() {
    const orderBtns = document.querySelectorAll('.order-btn');
    const orderSection = document.getElementById('order-section');
    const orderForm = document.getElementById('order-form');
    const selectedServiceText = document.getElementById('selected-service');
    const serviceNameInput = document.getElementById('service-name');
    const servicePriceInput = document.getElementById('service-price');
    const cancelOrderBtn = document.getElementById('cancel-order');
    const orderSuccess = document.getElementById('order-success');
    const newOrderBtn = document.getElementById('new-order-btn');
    
    if (orderBtns.length > 0 && orderSection) {
        console.log('Order buttons and section found');
        
        orderBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Order button clicked');
                
                const serviceName = this.getAttribute('data-service');
                const servicePrice = this.getAttribute('data-price');
                
                console.log(`Selected service: ${serviceName}, Price: ${servicePrice}`);
                
                selectedServiceText.textContent = `Selected Package: ${serviceName} - $${servicePrice}`;
                serviceNameInput.value = serviceName;
                servicePriceInput.value = servicePrice;
                
                orderForm.reset();
                orderForm.style.display = 'block';
                orderSuccess.style.display = 'none';
                
                orderSection.style.display = 'flex';
                orderSection.classList.add('active');
                
                document.body.style.overflow = 'hidden';
                
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 300);
            });
        });
        
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = 'Processing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                orderForm.style.display = 'none';
                orderSuccess.style.display = 'block';
                
                this.reset();
                submitBtn.innerHTML = 'Submit Order Request';
                submitBtn.disabled = false;
                
                console.log('Form processed successfully');
            }, 1500);
        });
        
        if (cancelOrderBtn) {
            cancelOrderBtn.addEventListener('click', function() {
                console.log('Cancel button clicked');
                
                orderSection.classList.remove('active');
                setTimeout(() => {
                    orderSection.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 300);
                
                orderForm.reset();
            });
        }
        
        if (newOrderBtn) {
            newOrderBtn.addEventListener('click', function() {
                console.log('New order button clicked');
                
                orderSection.classList.remove('active');
                setTimeout(() => {
                    orderSection.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 300);
                
                orderForm.reset();
            });
        }
        
        orderSection.addEventListener('click', function(e) {
            if (e.target === orderSection) {
                cancelOrderBtn.click();
            }
        });
    } else {
        console.log('Order buttons or section not found');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    const orderBtns = document.querySelectorAll('.order-btn');
    console.log('Order buttons found:', orderBtns.length);
    
    const orderSection = document.getElementById('order-section');
    console.log('Order section exists:', !!orderSection);
    
    orderBtns.forEach((btn, index) => {
        console.log(`Button ${index}:`, btn.getAttribute('data-service'));
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`Button ${index} clicked directly`);
            
            if (orderSection) {
                console.log('Showing order section');
                orderSection.style.display = 'flex';
                orderSection.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                console.error('Order section not found!');
            }
        });
    });
});

function initArticlePopup() {
    const articleLinks = document.querySelectorAll('.post-link, .btn-primary');
    const popup = document.getElementById('article-popup');
    const popupClose = document.querySelector('.article-popup-close');
    const popupTitle = document.querySelector('.article-popup-title');
    const popupCategory = document.querySelector('.article-popup-category');
    const popupDate = document.querySelector('.article-popup-date span');
    const popupAuthor = document.querySelector('.article-popup-author span');
    const popupBody = document.querySelector('.article-popup-body');
    
    const articleContent = {
        'ai': {
            title: 'The AI Revolution: How Machine Learning is Transforming Business in Ethiopia',
            category: 'Artificial Intelligence',
            date: 'February 15, 2025',
            author: 'Abebe Chanie',
            content: `
                <p>Artificial intelligence is reshaping industries across Ethiopia, from agriculture to finance. As businesses embrace digital transformation, AI and machine learning technologies are becoming essential tools for innovation and growth.</p>
                
                <p>Ethiopia's unique challenges and opportunities make it a fascinating case study for AI adoption in developing economies. With a rapidly growing tech sector and a government committed to digital transformation, the country is positioning itself as a potential AI hub in East Africa.</p>
                
                <h3>AI Applications in Ethiopian Industries</h3>
                
                <p>Several sectors are already seeing significant benefits from AI implementation:</p>
                
                <ul>
                    <li><strong>Agriculture:</strong> AI-powered systems are helping farmers optimize crop yields, predict weather patterns, and manage resources more efficiently. With agriculture accounting for over 30% of Ethiopia's GDP, these technologies have the potential to dramatically improve productivity and food security.</li>
                    
                    <li><strong>Healthcare:</strong> Machine learning algorithms are being used to improve disease diagnosis, especially in rural areas with limited access to specialists. AI-powered telemedicine platforms are extending healthcare reach to underserved communities.</li>
                    
                    <li><strong>Financial Services:</strong> Banks and fintech companies are leveraging AI for credit scoring, fraud detection, and personalized banking services. This is particularly important in a country where traditional banking infrastructure is still developing.</li>
                </ul>
                
                <h3>Challenges and Opportunities</h3>
                
                <p>Despite the promising applications, AI adoption in Ethiopia faces several challenges:</p>
                
                <blockquote>
                    "The biggest hurdle isn't the technology itself, but building the ecosystem around it—from data infrastructure to specialized talent and regulatory frameworks."
                </blockquote>
                
                <p>Key challenges include:</p>
                
                <ol>
                    <li>Limited access to quality data for training AI models</li>
                    <li>Shortage of AI specialists and data scientists</li>
                    <li>Infrastructure constraints, including reliable internet connectivity</li>
                    <li>Regulatory uncertainties around data privacy and AI ethics</li>
                </ol>
                
                <p>However, these challenges also present opportunities for innovation. Ethiopian startups are developing AI solutions tailored to local needs, often with frugal innovation approaches that maximize impact with minimal resources.</p>
                
                <h3>The Path Forward</h3>
                
                <p>For Ethiopian businesses looking to leverage AI, a strategic approach is essential:</p>
                
                <ol>
                    <li><strong>Start with clear business objectives</strong> rather than implementing AI for its own sake</li>
                    <li><strong>Invest in data infrastructure</strong> to ensure quality inputs for AI systems</li>
                    <li><strong>Build internal capabilities</strong> through training and partnerships with academic institutions</li>
                    <li><strong>Adopt a phased approach</strong>, starting with pilot projects that demonstrate value</li>
                </ol>
                
                <p>As Ethiopia continues its digital transformation journey, AI will play an increasingly important role in driving innovation and economic growth. Businesses that strategically adopt these technologies now will be well-positioned to lead in their respective industries.</p>
            `
        },
        'cloud': {
            title: '5 Key Considerations for Successful Cloud Migration',
            category: 'Cloud Computing',
            date: 'May 28, 2023',
            author: 'Tigist Haile',
            content: `
                <p>Moving to the cloud requires careful planning. As more Ethiopian businesses embrace cloud technologies, understanding the key factors for a successful migration becomes critical.</p>
                
                <p>Cloud adoption in Ethiopia has accelerated in recent years, driven by improved internet infrastructure, cost benefits, and the need for scalable IT solutions. However, migration projects often face challenges that can be mitigated with proper planning.</p>
                
                <h3>1. Comprehensive Assessment and Planning</h3>
                
                <p>Before migrating any workloads, conduct a thorough assessment of your current IT environment. This should include:</p>
                
                <ul>
                    <li>Application inventory and dependencies</li>
                    <li>Data classification and compliance requirements</li>
                    <li>Current performance baselines</li>
                    <li>Total cost of ownership analysis</li>
                </ul>
                
                <p>This assessment will help you determine which applications should be migrated first and which migration strategy is most appropriate for each workload.</p>
                
                <h3>2. Choosing the Right Cloud Model</h3>
                
                <p>Different cloud models offer different benefits and trade-offs:</p>
                
                <ul>
                    <li><strong>Public cloud:</strong> Offers scalability and cost-efficiency but may raise data sovereignty concerns</li>
                    <li><strong>Private cloud:</strong> Provides greater control and security but requires more investment</li>
                    <li><strong>Hybrid cloud:</strong> Combines public and private clouds for flexibility</li>
                    <li><strong>Multi-cloud:</strong> Uses services from multiple providers to avoid vendor lock-in</li>
                </ul>
                
                <p>For many Ethiopian organizations, a hybrid approach offers the best balance, allowing sensitive data to remain on-premises while leveraging public cloud for other workloads.</p>
                
                <h3>3. Security and Compliance Considerations</h3>
                
                <p>Security remains a top concern for cloud migration. Key considerations include:</p>
                
                <ul>
                    <li>Data encryption in transit and at rest</li>
                    <li>Identity and access management</li>
                    <li>Compliance with Ethiopian data protection regulations</li>
                    <li>Security responsibility boundaries between your organization and the cloud provider</li>
                </ul>
                
                <blockquote>
                    "Security in the cloud is a shared responsibility. Understanding where your obligations begin and where the provider's end is crucial for maintaining a secure environment."
                </blockquote>
                
                <h3>4. Network Connectivity and Performance</h3>
                
                <p>In Ethiopia, where internet reliability can be a challenge, network considerations are particularly important:</p>
                
                <ul>
                    <li>Assess bandwidth requirements for migrated applications</li>
                    <li>Consider dedicated connections for critical workloads</li>
                    <li>Implement traffic optimization techniques</li>
                    <li>Plan for redundancy to mitigate connectivity issues</li>
                </ul>
                
                <h3>5. Skills Development and Change Management</h3>
                
                <p>Cloud migration is as much about people as it is about technology. Successful transitions require:</p>
                
                <ul>
                    <li>Training IT staff on cloud technologies and operations</li>
                    <li>Engaging stakeholders throughout the migration process</li>
                    <li>Developing new operational procedures for the cloud environment</li>
                    <li>Creating a clear communication plan for all affected users</li>
                </ul>
                
                <p>By addressing these five key considerations, Ethiopian organizations can increase their chances of a successful cloud migration that delivers the expected benefits while minimizing disruption to business operations.</p>
            `
        },
    };
    
    articleLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            let articleType = 'ai'; // Default to AI article
            
            const postCard = this.closest('.post-card');
            const featuredPost = this.closest('.featured-post-container');
            
            if (postCard) {
                const category = postCard.querySelector('.post-category').textContent.trim().toLowerCase();
                if (category === 'cloud computing') articleType = 'cloud';
            }
            
            popupTitle.textContent = articleContent[articleType].title;
            popupCategory.textContent = articleContent[articleType].category;
            popupDate.textContent = articleContent[articleType].date;
            popupAuthor.textContent = articleContent[articleType].author;
            popupBody.innerHTML = articleContent[articleType].content;
            
            popup.classList.add('active');
            document.body.classList.add('popup-open');
            
            const paragraphs = popupBody.querySelectorAll('p, h3, ul, ol, blockquote');
            paragraphs.forEach((p, index) => {
                p.style.opacity = '0';
                p.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    p.style.transition = 'all 0.5s ease';
                    p.style.opacity = '1';
                    p.style.transform = 'translateY(0)';
                }, 100 + (index * 50));
            });
        });
    });
    
    if (popupClose) {
        popupClose.addEventListener('click', function() {
            popup.classList.remove('active');
            document.body.classList.remove('popup-open');
        });
    }
    
    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                popup.classList.remove('active');
                document.body.classList.remove('popup-open');
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            popup.classList.remove('active');
            document.body.classList.remove('popup-open');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initArticlePopup();
});