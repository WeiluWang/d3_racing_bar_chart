function main(){
    var data = [
        {
        name:"A",
        number: 10,
        rank:1
        },
        {
        name:"B",
        number: 20,
        rank:2
        },
        {
        name:"C",
        number: 30,
        rank:3
        },
        {
        name:"D",
        number: 40,
        rank:4
        },
        {
        name:"E",
        number: 50,
        rank:5
        }
    ]
    var width =800
    var height =650
    var svg = d3.select('svg')
    svg.style("width", width).style("height",height)
    var color = d3.scaleOrdinal(d3.schemeTableau10).domain("A","B","C","D","E");
    var xScale = d3.scaleLinear()
                    .domain([0, d3.max(data,d=>d.number)])
                    .range([0, width-20])

    var yScale = d3.scaleBand()
                    .paddingOuter(0.3)
                    .paddingInner(0.3)
                    .domain(data.map((d,i)=>d.rank))
                    .range([0, height])
                    

    var xAxis = d3.axisTop().scale(xScale)
    svg.append("g")
        .attr("class", "axis xAxis")
        .attr("transform", 'translate(10, 30)')
        .call(xAxis)

    svg.selectAll('rect')
        .data(data, d=>d.name)
        .join("rect")
        .attr("x",xScale(0)+10)
        .attr("y",(d,i)=> yScale(d.rank))
        .attr('width', d=>xScale(d.number)-xScale(0))
        .attr("height", yScale.bandwidth())
        .style("fill", function(d,i){return color(d.name)})
    
    setInterval(updateData,1000)
        function updateData(){
        
        data = data.map(d => {
            //console.log(d.name,d.number)
            return {name:d.name, number:d.number+Math.floor(Math.random()*Math.floor(10))}
        })
        //console.log(data)
        data.sort(function(a,b){return b.number-a.number})
        data = data.map((d,i) => {
            return {...d, rank:i+1}
        })

        xScale = d3.scaleLinear()
                    .domain([0, d3.max(data,d=>d.number)])
                    .range([0, width-20])
        xAxis = d3.axisTop().scale(xScale)
        svg.selectAll('.xAxis')
            .transition()
            .duration(800)
            .ease(d3.easeLinear)
            .call(xAxis)

         svg.selectAll('rect')
        .data(data, d=>d.name)
        .join("rect")
        .attr("x",xScale(0)+10)
        .attr("height", yScale.bandwidth())
        .style("fill", function(d,i){return color(d.name)})
        
        svg.selectAll('rect')
        .transition().ease(d3.easeLinear)
        .duration(800)
        .attr("y", d=> yScale(d.rank))
        .attr('width', d=>xScale(d.number)-xScale(0))
        console.log(data)
       
    }
    

}