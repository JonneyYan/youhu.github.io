import './css/main.css';
import './css/anim.css';

var throttle = function(type, name, obj) {
  obj = obj || window;
  var running = false;
  var func = function() {
    if (running) {
      return;
    }
    running = true;
    requestAnimationFrame(function() {
      obj.dispatchEvent(new CustomEvent(name));
      running = false;
    });
  };
  obj.addEventListener(type, func);
};

// 将scroll事件重定义为optimizedScroll事件
throttle('scroll', 'optimizedScroll');
function changeLogoAndHeader(rate) {
  if (rate <= 1) {
    const color = 'rgba(249, 82, 70, ' + rate + ')';
    header.style.backgroundColor = color;
  }else {
    header.style.backgroundColor = 'rgb(249, 82, 70)';
  }
}
const header = document.querySelector('.menu');
const logo = document.querySelector('.cover img');

window.addEventListener('optimizedScroll', function(event) {
  const maxScorllOffset = 500;
  const rate = window.pageYOffset / maxScorllOffset;

  changeLogoAndHeader(rate);
});
AV.initialize('X5XXTAHfmWUWDobjFeXT6BTO', '4Yvi4vPnLSnC6MqmdXPN2u0w');
var Post = AV.Object.extend('Post');

const submit = document.querySelector('input[name="submit"]');
let count = 0;
submit.onclick = function () {
  count++;
  if (count > 5) {
    alert('您点的太快了，请稍候再试！');
    return false;
  }
  const postContent = {
    name: document.querySelector('input[name="name"]').value,
    email: document.querySelector('input[name="email"]').value,
    phone: document.querySelector('input[name="phone"]').value,
    demand: document.querySelector('textarea[name="demand"]').value,
  };
  for (var variable in postContent) {
    if (postContent.hasOwnProperty(variable)) {
      if (postContent[variable] === '') {
        alert('请输入完整信息');
        return false;
      }
    }
  }
  var post = new Post();
  post.save(postContent, {
    success: function(post) {
      // 成功保存之后，执行其他逻辑.
      alert('非常感谢您的关注，我们会尽快联系您！祝您生活愉快~~~');
    },
    error: function(post, error) {
      // 失败之后执行其他逻辑
      // error 是 AV.Error 的实例，包含有错误码和描述信息.
      alert('发送失败，请重试！' + error.message);
    }
  });
};
