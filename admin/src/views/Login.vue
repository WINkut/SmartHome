<template>
  <div>
    <vue-particles id="tsparticles" :particlesLoaded="particlesLoaded" :options="options" />
    <div class="formContainer">
      <h2>网站后台管理系统</h2>
      <el-form ref="LoginFormRef" style="max-width: 500px" :model="LoginForm" status-icon :rules="LoginRules"
        label-width="80px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="LoginForm.username" type="message" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="LoginForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios';
import { useStore } from 'vuex';
const store = useStore()
//form表单字段 表单绑定的对象
const LoginForm = reactive({
  username: '',
  password: '',
})
const LoginFormRef = ref()//引用表单组件对象
//校验规则
const LoginRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },

  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
})
//创建router对象
const router = useRouter()
//登陆提交方法
const submitForm = () => {
  console.log('click');
  //校验表单
  LoginFormRef.value.validate(value => {
    if (value) {
      // console.log(LoginForm);

      // const res = await axios.get('http://localhost:3000/users')
      axios.post('/adminapi/user/login', LoginForm).then(res => {
        console.log(res.data);
        if (res.data.ActionType === 'OK') {
          console.log(res.data.data);
          store.commit('changeUserInfo', res.data.data)
          // 跳转到主页
          store.commit("changeGetterRouter", false)
          router.push('/index')
          // 获取到表单信息，并返回给后端进行确认是否存在，如果存在返回token值，前端进行保存并跳转到主页面
          // localStorage.setItem('token', JSON.stringify(LoginForm))
          //成功消息提醒
          ElMessage({
            message: '登陆成功',
            type: 'success',
          })
        } else {
          ElMessage.error('用户名或密码错误！')
          //清空表单内容
          // LoginFormRef.resetField(res => {
          //   console.log(res);
          // })
        }
      })

    }
  })
}



//颗粒背景的样子字段
const options = {
  background: {
    color: {
      value: '#2d3a4b'
    }
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push'
      },
      onHover: {
        enable: true,
        mode: 'repulse'
      },
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: '#ffffff'
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: 'bounce',
      random: false,
      speed: 6,
      straight: false
    },
    number: {
      density: {
        enable: true,
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: 'circle'
    },
    size: {
      value: { min: 1, max: 5 }
    }
  },
  detectRetina: true
}
</script>
<style scoped lang="scss">
.formContainer {
  width: 500px;
  height: 300px;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%, );
  background: rgba($color: #000000, $alpha: 0.5);
  color: white;
  text-align: center;
  padding: 20px;


}

h2 {
  margin-bottom: 20px;
  font-size: 30px;
}

::v-deep .el-form-item__label {
  color: white;
}
</style>
