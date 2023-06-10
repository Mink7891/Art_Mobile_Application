import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native';
import CircleTask from './CircleTask';
import Tablet from './Tablet';
import { useSelector } from 'react-redux';




const  Train = ({route, navigation})  => {
  const rate = route.params.rate;
  const [line, setLine] = useState(5000)

  const [age, setAge] = useState([
    { 
        "year": 'Первобытное искусство', 
        "rate" : 100, 
        "title" : "Первобытное искусство. Когда, где и почему началось искусство?",
        "text" : "Искусство является одной из самых древних форм самовыражения и культурного развития человека. Оно имеет свои корни в далеком прошлом и является свидетельством эволюции человеческой мысли и воображения. Давайте углубимся в историю первобытного искусства и рассмотрим эпохи, в которых оно возникло.<br/><br/>Когда и где началось искусство?<br/><br/>Исследования археологов и антропологов позволяют нам восстановить историю первобытного искусства. Оно появилось в период, который известен как палеолит, примерно 2,5 миллиона лет назад. В это время человек был охотником-собирателем, и его жизнь полностью зависела от природы. Палеолитическое искусство характеризуется высоким уровнем художественного мастерства и магическим и религиозным значением. Оно было создано в различных местах по всему миру, таких как пещеры, стены скал и предметы быта.<br/><br/>Период мезолита<br/><br/>Мезолит (от греч. 'средний камень') наступил после палеолита и продолжался примерно от 10 000 до 5 000 лет до нашей эры. В это время климат стал более умеренным, и человек начал охоту и собирательство в более разнообразных ландшафтах. Мезолитическое искусство, в отличие от палеолитического, отличается более простыми и непосредственными формами. Оно включает в себя изображения животных, растений и человека на различных материалах, таких как кости, камни и дерево. Многие из этих произведений искусства имеют ритуальное значение и связаны с обрядами и магическими верованиями.<br/><br/>Период неолита<br/><br/>Неолит (от греч. 'новый камень') – это период, который наступил примерно 10 000 лет до нашей эры и продолжался до появления письменности. В это время произошли значительные изменения в образе жизни человека. Он стал заниматься земледелием, разводить скот и строить поселения. Неолитическое искусство было связано с обрядами и религиозными практиками. В этот период появились первые мегалитические сооружения, такие как Стоунхендж и Карнак, которые служили как священные места и символы космического порядка.<br/><br/>Влияние первобытного искусства<br/><br/>Первобытное искусство имеет огромное значение для нашего понимания прошлого и самой сути человеческой природы. Оно помогает нам проследить эволюцию мышления, творческих способностей и культурных практик наших предков. Произведения первобытного искусства являются наследием, которое до сих пор восхищает нас своей красотой, выразительностью и глубиной смысла.<br/><br/>Первобытное искусство является неотъемлемой частью нашего культурного наследия, которое мы должны ценить и сохранять. Оно служит свидетельством творческой деятельности наших предков и напоминает нам о нашем собственном потенциале в области искусства и самовыражения. Благодаря первобытному искусству мы можем глубже понять самих себя и свою историю.<br/><br/>",
        "img" : "https://must-see.top/wp-content/uploads/2018/06/kueva-de-las-manos-700x465.jpg"
    
    },
    { 
        "year": 'Искусство Месопотамии', 
        "rate" : 350,
        "title" : "Искусство Месопотамии: Открывая врата древних цивилизаций",
        "text" : "Месопотамия, расположенная в долине между реками Тигр и Евфрат, считается колыбелью цивилизации. Эта древняя область, населенная мощными империями и разнообразными народами, оставила неизгладимый след в истории человечества. Одним из самых захватывающих аспектов этой богатой культурой земли было искусство, которое свидетельствует о глубокой эстетической и духовной сущности месопотамского общества.<br/><br/>Месопотамия впечатляет нас своей уникальной архитектурой, грандиозными сооружениями и художественными произведениями. Ее города возвышались сооружениями, такими как зиккураты - священные башни, служившие связующим звеном между небом и землей. Среди них знаменитый зиккурат в Уруке, который служил храмом и символизировал мощь и богатство государства.<br/><br/>Месопотамские художники, мастера резьбы по камню и глине, создавали невероятно детализированные скульптуры и бас-рельефы, изображающие богов, героев и повседневную жизнь. Эти произведения искусства часто отражали религиозные верования и культовые практики, а также отображали исторические события и великих правителей.<br/><br/>Керамика также была важной частью месопотамского искусства. Великолепные вазы и горшки украшались изысканными орнаментами и сценами из повседневной жизни. Они служили не только практической цели, но и являлись предметами поклонения богам и символами богатства и статуса.<br/>Месопотамия также славится своими наскальными росписями, которые представляют собой фантастические сцены с божествами, животными и людьми. Эти неповторимые произведения искусства раскрывают нам тайны жизни и мышления месопотамцев, их представления о космосе и сверхъестественном.<br/><br/>Искусство Месопотамии является наследием древних цивилизаций, которые стояли у истоков человеческой культуры и прогресса. Это яркий пример того, как искусство может выразить глубокие идеи, верования и историю народа. Разгадывая символику и красоту месопотамского искусства, мы раскрываем уникальный мир, который оставил свой след в истории и оставил нам бесценное наследие.",
        "img" : "https://avatars.dzeninfra.ru/get-zen_doc/1721884/pub_622b46385903191c13b48115_622b49c55903191c13ba82d8/scale_1200"
    },
    { "year": 'Древний Египет' , "rate" : 600},
    { "year": 'Эгейская культура' , "rate" : 850},
    { "year": 'Древняя Греция' , "rate" : 1100},

  ])



  return (
      
      <View style={styles.container}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.lineContainer}
        >
          
          <View style={[styles.line, { width: line }]}>

            <View style={[styles.inputLine, { width: rate * 45 }]}></View>
            {age.map((item, index) => {
              return <CircleTask key={item.year} navigation={navigation} age={item.year} index={index} rate={item.rate} text={item.text} title={item.title} userRate={rate} img={item.img}></CircleTask>
            })}

          </View>

        </ScrollView>

      </View>
 

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lineContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  line: {
    position: 'relative',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    height: 15,
    backgroundColor: 'gray',
   

  },


  inputLine: {

    borderRadius: 10,
    backgroundColor: 'black',
    width: 100,
    height: '100%'
  },


});



export default Train;
