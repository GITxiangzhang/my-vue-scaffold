<template>
  <div class="footer">

    <ul class="footer-bar">
      <li><a href="https://home.kpmg/cn/en/home/misc/legal.html"
           @click.prevent="linkTo">{{$t('FOOTER_LEGAL')}}</a></li>
      <li><a href="https://home.kpmg/cn/en/home/misc/privacy.html"
           @click.prevent="linkTo">{{$t('FOOTER_PRIVACY')}}</a></li>
    </ul>

    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <p class="footer-info ">
            {{$t('FOOTER_DES')}}
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    methods: {
        linkTo(e) {
            window.open(e.target.href);
        }
    }
};
</script>

<style>
.footer-info {
    color: #999999;
    font-size: 10px;
    line-height: 16px;
}
.footer-bar {
    display: flex;
    list-style: none;
    height: 28px;
    justify-content: flex-start;
}
.footer-bar li {
    margin-right: 24px;
    color: #444;
    cursor: pointer;
}
.footer-bar li a {
    color: #444;
}
.footer-bar li a:hover {
    text-decoration: underline;
}
.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 80px;
    z-index: 99;
    padding: 8px 12px;
    border-top: 2px solid rgba(88, 115, 216, 1);

    background-color: rgba(228, 228, 228, 1);
}
</style>
