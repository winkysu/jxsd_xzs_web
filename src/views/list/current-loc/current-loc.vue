<template>
    <div class="current-loc">
        <div class="breadcrumbs cle">
          <div class="menus">
            <template v-for="(item,index) in curLoc">
                <router-link :to="{name: 'index'}" v-if="index===0">{{item.name}}</router-link>
                <router-link :to="{name: 'list', params:{id: item.id}}" v-else>{{item.name}}</router-link>
                <!-- <a @click="changeMenu(item.id)">{{item.name}}</a> -->
                <code v-if="index!==curLoc.length-1">&gt;</code>
            </template>
          </div>
        </div>
    </div>
</template>
