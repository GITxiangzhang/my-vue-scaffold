<template>
  <div class="error-page">
    <div class="error-code">4<span>0</span>4</div>
    <div class="error-desc">{{$t('page_undefined')}}</div>
    <div class="error-handle">
      <el-button @click="goHome"
                 type="primary"
                 size="large">{{$t('return_home_page')}}
      </el-button>
      <el-button class="error-btn"
                 type="primary"
                 size="large"
                 @click="goBack">{{$t('return_prev_page')}}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        goHome() {
            this.$router.push({ name: 'home' });
        }
    }
};
</script>


<style scoped>
.error-page {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #f3f3f3;
    box-sizing: border-box;
}

.error-code {
    margin-top: 110px;
    line-height: 1;
    font-size: 250px;
    font-weight: bolder;
    color: #f02d2d;
}

.error-code span {
    color: #a172a9;
}

.error-desc {
    font-size: 30px;
    color: #777;
}

.error-handle {
    margin-top: 30px;
    padding-bottom: 200px;
}

.error-btn {
    margin-left: 100px;
}
</style>
