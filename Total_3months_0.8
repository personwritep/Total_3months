// ==UserScript==
// @name        Total 3months
// @namespace        http://tampermonkey.net/
// @version        0.8
// @description        アクセス解析3ヵ月分のデータを集計して表示する
// @author        Ameba Blog User
// @match        https://blog.ameba.jp/ucs/analysis*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=ameba.jp
// @grant        none
// @updateURL        https://github.com/personwritep/Total_3months/raw/main/Total_3months.user.js
// @downloadURL        https://github.com/personwritep/Total_3months/raw/main/Total_3months.user.js
// ==/UserScript==


let total=[]; // データ総計用 配列
let list_disp=0; // リストの表示フラグ

let read_json=sessionStorage.getItem('Total_3'); // セッションストレージ保存名
total=JSON.parse(read_json);
if(total==null){ total=[]; } // 🔴 集計データを読込み



let target=document.querySelector('#root > div');
let monitor=new MutationObserver(page_change);
if(target){
    monitor.observe(target, { childList: true }); }

page_change();

function page_change(){
    let path=location.pathname;
    if(path.includes('analysis_page.do')){
        let search=location.search;
        if(!search.includes('order=organic_click_desc')){
            open_more();
            setTimeout(()=>{
                main(); } ,600); }}
    else if(path.includes('analysis_page_detail.do')){
        sw_panel_close(); }

} // page_change()



function open_more(){
    let more=document.querySelector('.p-accessGraph__moreLinkBtn');
    if(more){
        more.click(); }}


function sw_panel_close(){
    let sw_panel=document.querySelector('.sw_panel');
    if(sw_panel){
        sw_panel.remove(); }}



function main(){
    let help_url='https://ameblo.jp/personwritep/entry-12961190627.html';

    let panel=
        '<div class="sw_panel">'+
        '<button class="scan">Scan</button>'+
        '<button class="disp">Total Display</button>'+
        '<button class="disp_aside">Aside Display</button>'+
        '<a href="'+ help_url +'" rel="noopener noreferrer" target="_blank">'+
        '<p class="help_t3m">?</p></a>'+
        '<style>'+
        '.sw_panel { position: absolute; top: 16px; right: 30px; z-index: 20; '+
        'display: flex; align-items: center; } '+
        '.disp, .scan, .disp_aside { font: normal 16px/24px Meiryo; color: #000; '+
        'padding: 0 8px; margin: 0 6px; height: 24px; background: #fff; '+
        'border: 1px solid #009688; border-radius: 3px; } '+
        '.help_t3m { display: inline-block; font: bold 16px/18px Meiryo; '+
        'height: 15px; padding: 1px 4px; margin: 0 4px; '+
        'border: 1px solid #999; border-radius: 20px; } '+
        '</style></div>';

    if(!document.querySelector('.sw_panel')){
        document.querySelector('#ucsContent').insertAdjacentHTML('beforeend', panel); }


    disp_able();


    let scan=document.querySelector('.sw_panel .scan');
    if(scan && list_disp==0){
        scan.onclick=()=>{
            total=[];
            sessionStorage.removeItem('Total_3'); // 🔴 集計データのセッションストレージをリセット

            scan.style.display='none';

            select_month(4);
            setTimeout(()=>{
                open_more();
                get_data();
            }, 400);

            setTimeout(()=>{
                select_month(5);
                setTimeout(()=>{
                    open_more();
                    get_data();
                }, 400);
            }, 1000);

            setTimeout(()=>{
                select_month(6);
                setTimeout(()=>{
                    open_more();
                    get_data();
                }, 400);
            }, 2000);

            setTimeout(()=>{
                select_month(0);
                let write_json=JSON.stringify(total); // 🔴 集計データをストレージ保存
                sessionStorage.setItem('Total_3', write_json); // セッションストレージ保存名
                disp_able();
            }, 3000);


            function select_month(n){
                let S_radio=document.querySelectorAll('.c-radioSelect__radio');
                if(S_radio[n]){
                    S_radio[n].click(); }}

        }} // if(scan && list_disp==0){

    if(list_disp==2){
        total_disp_aside(); } // 期間変更時に「Aside」表示の再表示が必要



    let disp=document.querySelector('.sw_panel .disp');
    if(disp){
        disp.addEventListener('click', function(event){
            event.stopImmediatePropagation();
            if(list_disp==0){ // 0:「非表示」 1:「Total」 2:「Aside」
                if(total.length!=0){
                    list_disp=1;
                    total_disp(); }}
            else if(list_disp==1){ // 1:「Total」
                list_disp=0;
                total_disp_del(); }
            else if(list_disp==2){ // 2:「Aside」
                total_disp_aside_del();
                if(total.length!=0){
                    list_disp=1;
                    total_disp(); }}}); }



    let disp_aside=document.querySelector('.sw_panel .disp_aside');
    if(disp_aside){
        disp_aside.addEventListener('click', function(event){
            event.stopImmediatePropagation();
            if(list_disp==0){ // 0:「非表示」 1:「Total」 2:「Aside」
                if(total.length!=0){
                    list_disp=2;
                    total_disp_aside(); }}
            else if(list_disp==1){ // 1:「Total」
                total_disp_del();
                if(total.length!=0){
                    list_disp=2;
                    total_disp_aside(); }}
            else if(list_disp==2){ // 2:「Aside」
                list_disp=0;
                total_disp_aside_del(); }}); }



    function disp_able(){
        let disp=document.querySelector('.sw_panel .disp');
        let disp_aside=document.querySelector('.sw_panel .disp_aside');
        if(disp && disp_aside){
            if(total.length==0){
                disp.style.opacity='0.4';
                disp_aside.style.opacity='0.4'; }
            else{
                disp.style.opacity='1';
                disp_aside.style.opacity='1'; }}}

} // main()



function get_data(){
    let PAGLI=document.querySelectorAll('.p-accessAnalysisGraphListItem');
    for(let k=0; k<PAGLI.length; k++){
        let id;
        let title;
        let ac_count;

        let item_link=PAGLI[k].querySelector('.p-accessAnalysisGraphListItem__link');
        if(item_link){
            let url=new URL(item_link.href);
            id=url.searchParams.get('id'); }

        let item_titl=PAGLI[k].querySelector('.p-accessAnalysisGraphListItem__titleText');
        if(item_titl){
            title=item_titl.textContent; }

        let item_count=PAGLI[k].querySelector('.p-accessAnalysisGraphListItem__count');
        if(item_count){
            ac_count=item_count.textContent/1; } // 数値化

        add_data(id, title, ac_count); }


    function add_data(id, title, ac_count){
        let index=total.findIndex(row=>row[0]==id);
        if(index!=-1){
            total[index][2]+=ac_count; }
        else{
            total.push([id, title, ac_count]); }}

} // get_data()



function sort_data(){
    total.sort((a, b) => b[2] - a[2]); }



function total_disp(){
    sort_data();

    let t_panel=
        '<div id="t_panel">'+
        '<ul>';

    for(let k=0; k<total.length; k++){
        t_panel+=
            '<li class="li_total">'+
            '<a href="/ucs/analysis/analysis_page_detail.do?id='+ total[k][0] +'" target="_blank">'+
            '<span class="title_total">'+ total[k][1] +'</span>'+
            '<span class="ac_total">'+ total[k][2] +'</span>'+
            '</a></li>'; }

    t_panel+=
        '</ul>'+
        '<style>'+
        '#t_panel { position: fixed; top: 230px; right: 0; height: calc(100vh - 280px); '+
        'font: normal 14px/16px Meiryo; padding: 14px 12px; background: #fff; '+
        'border: 1px solid #ccc; overflow-y: scroll; overscroll-behavior-y: none; } '+
        '.li_total { height: 30px; } '+
        '.li_total a { padding: 4px 0 2px; color: #333; } '+
        '.li_total a:hover { text-decoration: none; background: #e2eef0; } '+
        '.title_total, .ac_total { display: inline-block; padding: 2px 6px; vertical-align: -6px; } '+
        '.title_total { width: 480px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; } '+
        '.ac_total { min-width: 60px; overflow: hidden; } '+
        '</style></div>';

    if(!document.querySelector('#t_panel')){
        document.body.insertAdjacentHTML('beforeend', t_panel); }

} // total_disp()



function total_disp_del(){
    if(document.querySelector('#t_panel')){
        document.querySelector('#t_panel').remove(); }}



function total_disp_aside(){
    let td_style=
        '<style class="total_disp_style">'+
        '.p-accessAnalysisGraphListItem { position: relative; } '+
        '.assp { display: inline-block; position: absolute; top: 0; right: -60px; '+
        'font: 14px/16px Meiryo; color: #333; height: 16px; padding: 8px 4px 6px; '+
        'width: 50px; text-align: right; background: #fff; border-right: 1px solid #ccc; } '+
        '.assp._top { top: -9px; padding-top: 16px; border-top: 1px solid #e2e2e2; } '+
        '.assp._bottom { padding-bottom: 14px; border-bottom: 1px solid #e2e2e2; } '+
        '</style>';

    if(!document.querySelector('.total_disp_style')){
        document.body.insertAdjacentHTML('beforeend', td_style); }


    let PAGLI=document.querySelectorAll('.p-accessAnalysisGraphListItem');
    for(let k=0; k<PAGLI.length; k++){
        let assp='<span class="assp"></span>';
        if(!PAGLI[k].querySelector('.assp')){
            PAGLI[k].insertAdjacentHTML('beforeend', assp); }}

    let all_assp=document.querySelectorAll('.assp');
    let assp_top=all_assp[0];
    if(assp_top){
        assp_top.classList.add('_top'); }

    let assp_bottom=all_assp[all_assp.length-1];
    if(assp_bottom){
        assp_bottom.classList.add('_bottom'); }


    for(let k=0; k<PAGLI.length; k++){
        let id;
        let item_link=PAGLI[k].querySelector('.p-accessAnalysisGraphListItem__link');
        if(item_link){
            let url=new URL(item_link.href);
            id=url.searchParams.get('id'); }
        let index=total.findIndex(row=>row[0]==id);
        if(index!=-1){
            let assp=PAGLI[k].querySelector('.assp');
            if(assp){
                assp.textContent=total[index][2]; }}}

} // total_disp_aside()



function total_disp_aside_del(){
    let assp_all=document.querySelectorAll('.p-accessAnalysisGraphListItem .assp');
    for(let k=0; k<assp_all.length; k++){
        assp_all[k].remove(); }}
