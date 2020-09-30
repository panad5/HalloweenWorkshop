let candy;
d3.csv('candy-data.csv', d=>{
	return {
	  ...d, // spread operator
	  winpercent: +d.winpercent, // convert to integer
	}
  }).then(data=>{
	  console.log('candy', data);
	  candy = data;
      candy = candy.sort(function(a,b) { return b.winpercent - a.winpercent;});
      candy = candy.slice(0,10);
	  console.log('candy', candy);

	  d3.select('.popular').text("The most popular candy is Reeses Peanut Butter Cup");
      const extent = d3.extent(candy, d=>d.winpercent);
      console.log(extent);
	const width = 1000;
	const height = 1000;
	const svg = d3.select('.candy-plot')
		.append('svg')
    	.attr('width', width)
		.attr('height', height);
                
                svg.selectAll('rect')
                .data(candy)
                .enter()
                .append('rect')
                .attr('y', (d,i)=>((65*i)+50))
                .attr('x', (d,i)=>(300))
                .attr('width', d=>400*d.winpercent/extent[1])
                .attr('height', 50)
                .attr('fill', 'orange')//change bar color
                .attr('class', 'bar') 
      
                svg.selectAll('text.labels')
                    .data(candy)
                    .enter()
                    .append('text')
                    .text(function(d){
                        return d.competitorname;
                    })
                    .attr('x', (d,i)=>(0))
                    .attr('y', (d,i)=>((65*i)+70))
                    .attr("text-anchor", "left")
                    .attr("font-size", "20")
                    .attr("fill", "white") //change text color
      
                    svg.selectAll('text.values')
                    .data(candy)
                    .enter()
                    .append('text')
                    .text(function(d){
                        let popularity = d.winpercent
                        return popularity + " " + "%";
                    })
                    .attr('x',d=>410+ 250*d.winpercent/extent[1])
                    .attr('y', (d,i)=>((65*i)+70))
                    .attr("text-anchor", "end")
                    .attr("font-size", "20")
                    .attr("fill", "black")
  });