import {skills} from './PortData.js';
import {projects} from './Project-data.js';
import { certificates } from './certificate-Data.js';

let skillHTML = '';

skills.forEach((skill) => {
        skillHTML += `
        <div class="skill-item">

            <div class="skill-name">
                <h2>${skill.name}</h2>
            </div>

            <div class="skill-pic">
                <i class="${skill.iconClass}"></i>
            </div>

            <div class="star-bar">
                <img class="rating-img" src="ratings/rating-${skill.rating * 10}.png" alt="Rating">
                <p>${skill.rating}/5</p>
            </div>

            <p>${skill.description}</p>
        </div>
        `
    });
document.querySelector('.js-skills-container').innerHTML += skillHTML;

let projectHTML = '';

projects.forEach((project) => {
    projectHTML += `
    <div class="project-items" data-name="projects">
                <div class="img-part">
                    <img src="project-image/${project.projectImg}" alt="${project.projectName}">
                </div>
                
                <div class="project-info">
                    <h2 class="name-info">${project.projectName}</h2>

                    <div class="description-info">
                        <p>${project.projectDescription}</p>
                        <a href="projectPage.html?id=${project.id}"><button>See Project</button></a>
                    </div>

                </div>
                
            </div>
    `
})

document.querySelector('.js-projects-container').innerHTML += projectHTML;

let certificateHTML = ''

certificates.forEach((certific) => {
    certificateHTML += `
    <div class="certificate-section" data-name="certifications">
                <div class="cerificate-img">
                    <img src="${certific.certificImg}" alt="certificate">
                </div>
            </div>`
})
document.querySelector('.js-projects-container').innerHTML += certificateHTML;


const filterButtons = document.querySelectorAll('.js-filter-item');

const filterCards = (filter) => {
    document.querySelectorAll('.projects-container > *').forEach(item => {
        // item may be project-items or certificate-section
        const name = item.dataset.name || '';
        if (filter === 'all' || name === filter) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

filterButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        filterCards(e.target.dataset.filter)
    });
});

if (filterButtons.length > 0) {
    filterButtons[0].classList.add('active');
    filterCards(filterButtons[0].dataset.filter);
}

/* Typing animation: types forward then deletes (loop) */
(function typeAnimatedNames() {
    const names = ["Developer", "Designer", "Freelancer"];
    const el = document.querySelector(".js-name-random");
    if (!el) return;

    const typeSpeed = 100;      // ms per char when typing
    const deleteSpeed = 50;     // ms per char when deleting
    const pauseAfterFull = 1600; // pause on full word (ms)

    let nameIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function tick() {
        const current = names[nameIndex];
 
        if (!isDeleting) {
            charIndex++;
            el.innerText = current.slice(0, charIndex); 

            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(tick, pauseAfterFull);
            } else {
                setTimeout(tick, typeSpeed);
            }
        } else {
            charIndex--;
            el.innerText = current.slice(0, charIndex);

            if (charIndex === 0) {
                isDeleting = false;
                nameIndex = (nameIndex + 1) % names.length;
                setTimeout(tick, 300);
            } else {
                setTimeout(tick, deleteSpeed);
            }
        }
    }

    tick();
})();


// toggle menu
    document.querySelector('.bar-icon').addEventListener('click', () => {
        const menu = document.querySelector('.js-mobile-menu');
        const icon = document.querySelector('.bar-icon')
        menu.classList.toggle('open');

        if (menu.classList.contains('open')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
        }
    })


// navigation underline/active state handling
function navLinkActive() {
    const links = document.querySelectorAll('nav .nav-list ul li a');
    if (!links.length) return;

    // highlight on click (useful for immediate feedback)
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // highlight based on section in viewport (scroll spy)
    const sections = document.querySelectorAll('section');
    if (!sections.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // section is considered active when 30% visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                
                const id = entry.target.getAttribute('id');
                // remove active from all links then add to current
                links.forEach(l => {
                    if (l.getAttribute('href') === `#${id}`) {
                        l.classList.add('active');
                    } else {
                        l.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
};


// animate backgroud

(function () {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const COLORS = [
        'rgba(99,  102, 241, VAL)',
        'rgba(139,  92, 246, VAL)',
        'rgba( 59, 130, 246, VAL)',
        'rgba( 20, 184, 166, VAL)',
        'rgba(236,  72, 153, VAL)',
    ];

    function randomBetween(a, b) { return a + Math.random() * (b - a); }

const ORBS = [];
const minDist = 300;
while (ORBS.length < 4) {
    const candidate = {
        x:          randomBetween(0, window.innerWidth),
        y:          randomBetween(0, window.innerHeight),
        r:          randomBetween(80, 160),
        color:      COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha:      randomBetween(0.12, 0.22),
        dx:         randomBetween(-0.2, 0.2),
        dy:         randomBetween(-0.2, 0.2),
        pulse:      randomBetween(0, Math.PI * 2),
        pulseSpeed: randomBetween(0.005, 0.015),
    };
    const tooClose = ORBS.some(o =>
        Math.hypot(o.x - candidate.x, o.y - candidate.y) < minDist
    );
    if (!tooClose) ORBS.push(candidate);
}

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ORBS.forEach(orb => {
            orb.pulse += orb.pulseSpeed;
            const liveAlpha = orb.alpha + Math.sin(orb.pulse) * 0.07;

            const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
            grad.addColorStop(0,   orb.color.replace('VAL', (liveAlpha * 1.8).toFixed(2)));
            grad.addColorStop(0.4, orb.color.replace('VAL', (liveAlpha).toFixed(2)));
            grad.addColorStop(1,   orb.color.replace('VAL', '0'));

            ctx.beginPath();
            ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();

            orb.x += orb.dx;
            orb.y += orb.dy;
            if (orb.x < -orb.r)                 orb.x = canvas.width  + orb.r;
            if (orb.x >  canvas.width  + orb.r) orb.x = -orb.r;
            if (orb.y < -orb.r)                 orb.y = canvas.height + orb.r;
            if (orb.y >  canvas.height + orb.r) orb.y = -orb.r;
        });

        requestAnimationFrame(draw);
    }

    draw();
})();

// ระะบบของกรอบรูปเวลาเอาเมาส์เลื่อนไปทางไหนกอบรูปเอียงไปทางนั้น 3D
/* ── HUD TILT ENGINE ── */

const hudEl    = document.getElementById('hud-tilt');
const hudInner = document.getElementById('hud-inner');
const hudGlare = document.getElementById('hud-glare');
const MAX   = 16;
const SCALE = 1.04;

hudEl.addEventListener('mousemove', e => {
    const r = hudEl.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top)  / r.height;
    const rotY =  (x - 0.5) * MAX * 2;
    const rotX = -(y - 0.5) * MAX * 2;

    hudInner.style.transform =
        `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${SCALE},${SCALE},${SCALE})`;

    hudGlare.style.background =
        `radial-gradient(circle at ${x*100}% ${y*100}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
});

hudEl.addEventListener('mouseenter', () => {
    hudInner.style.transition = 'transform 0.15s ease';
});

hudEl.addEventListener('mouseleave', () => {
    hudInner.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    hudInner.style.transform  = 'rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    setTimeout(() => { hudInner.style.transition = 'transform 0.08s linear'; }, 500);
});

// comment section 

// read more btn


// แยก function read more ออกมา
function initReadMore() {
  document.querySelectorAll('.js-comments-list .comment-card').forEach(card => {
    

    // read more
    const p = card.querySelector('.name-comment p');
    if (!p) return;
    if (card.querySelector('.read-more-btn')) return;

    p.style.display = '-webkit-box';
    p.style.webkitLineClamp = '2';
    p.style.webkitBoxOrient = 'vertical';
    p.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      if (p.scrollHeight <= p.clientHeight) return;
    
      const btn = document.createElement('button');
      btn.className = 'read-more-btn';
      btn.textContent = 'read more';
      p.after(btn);

      btn.addEventListener('click', () => {
        const isCollapsed = p.style.webkitLineClamp !== 'unset';
        if (isCollapsed) {
          p.style.display = 'block';
          p.style.webkitLineClamp = 'unset';
          p.style.overflow = 'visible';
          btn.textContent = 'show less';
        } else {
          p.style.display = '-webkit-box';
          p.style.webkitLineClamp = '2';
          p.style.overflow = 'hidden';
          btn.textContent = 'read more';
        }
      });
    });
  });
}
// count comment

// update comment
function updateCount() {
  const count = document.querySelectorAll('.js-comments-list .comment-card').length;
  document.querySelector('#comment-count').textContent = `${count} comment` ;
}

document.addEventListener('DOMContentLoaded', () => {
  const comments = document.querySelectorAll('.js-comments-list .comment-card');
  const count = comments.length;

  // เปลี่ยน selector ให้ตรงกับ element count ของคุณ
  document.querySelector('#comment-count').textContent = `${count} comment`;
});

// rating active when click
  const btn = document.querySelectorAll('.rating-row button');

  const activeBtn = (e) => {
    btn.forEach(btn => btn.classList.remove('activeBTN'));
    e.target.classList.add('activeBTN');
  }

  btn.forEach((button) => {
    button.addEventListener('click', activeBtn);
  });

//  post comment



function postComment () {

    const postBtn = document.querySelector('.btn-grad')

    postBtn.addEventListener('click', () => {
        const btn = document.querySelectorAll('.rating-row button');
        const nameInput = document.querySelector('#r-name')
        const msgInput = document.querySelector('#r-msg')

        const nameValue = nameInput.value
        const msgValue = msgInput.value

        if (!nameValue || !msgValue) return;

        let ratingValue = ''
        btn.forEach((button) => {
            if(button.classList.contains('activeBTN')) {
                ratingValue = button.textContent
                button.classList.remove('activeBTN')
            }
        });

        function getRandomColor() {
        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22'];
        return colors[Math.floor(Math.random() * colors.length)];
        }


            const GencommentHTML = `
                <div class="comment-card">
                     <div class="profile-user">
                        <img style="background: ${getRandomColor()};" src="portfolioImg-about/user img.png" alt="user">
                    </div>

                    <div class="name-comment">
                        <div class="rating-name">
                            <div>
                                <span class="name">${nameValue}</span>
                                <span class="rating">rating: ${ratingValue}</span>
                            </div>
                        </div>

                        <p>${msgValue}</p>
                        
                    </div>
                </div>
            `;

            document.querySelector('.js-comments-list').insertAdjacentHTML('beforeend', GencommentHTML);
            initReadMore();
            saveComments();
            updateCount();

            nameInput.value = '';
            msgInput.value = '';
            });

}


localStorage.clear()

function saveComments() {
  const comments = document.querySelector('.js-comments-list').innerHTML;
  localStorage.setItem('comments', comments);
}

function loadComments() {
  const saved = localStorage.getItem('comments');
  if (saved) {
    document.querySelector('.js-comments-list').innerHTML = saved;
    
    // ลบ read-more-btn ที่ save มาทั้งหมดออกก่อน
    document.querySelectorAll('.read-more-btn').forEach(btn => btn.remove());
    
    // แล้วสร้างใหม่พร้อม event listener
    initReadMore();
    updateCount();
  }
}



document.addEventListener('DOMContentLoaded', () => {
loadComments();
initReadMore()
postComment();
});

postComment()



