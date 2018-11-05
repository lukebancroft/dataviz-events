class CloudGraph { /** 
    * @param {String} id
    * @param {Number} dataset 
    * @param {Number} width
    * @param {Number} height **/
   
    constructor(id, dataset, width, height) { 
        this.dataset = dataset;
        this.id = id;
        this.width = width;
        this.height = height;
        this.svg = d3.select(this.id).attr("width", this.width).attr("height", this.height); 
    }

    draw() {
        // Create Scale to compute automatically ticks (that are the values on axis)
        const xScale = d3.scaleLinear()
        .domain([0,  d3.max(this.dataset.persons, function(d) { return d.position.x; })])
        .range([30, this.width - 60]); 
        
        // 30 & -30 to not get axis truncated (kind of margin)
        // Create x axis
        const x_axis = d3.axisBottom().scale(xScale); // Append it to SVG
        this.svg.append("g")
        .attr("transform", 'translate(0,30)')
        .call(x_axis);
        
        //Place it to bottom & -30 to not get out of SVG bounds .call(x_axis);
        // Same thing with yAxis
        const yScale = d3.scaleLinear()
        .domain([0,  d3.max(this.dataset.persons, function(d) { return d.position.y; })])
        .range([30, this.height - 30]);
        
        const y_axis = d3.axisLeft().scale(yScale); 
        this.svg.append("g")
        .attr("transform", 'translate(30,0)')
        .call(y_axis);
        
        // Create nodes
        const color = d3.scaleOrdinal(d3.schemeCategory10); 
        this.svg.selectAll("circle") 
        .data(this.dataset).enter() 
        .append("circle")
        .attr("cx", d => xScale(d.position.x)) 
        .attr("cy", d => yScale(d.position.y)) 
        .attr("r", 5)
        .attr("fill", d => color(d[1]));
        
        // Create texts
        this.svg
        .selectAll("person")
        .data(this.dataset.persons)
        .enter() 
        .append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", "0.8em")
        .attr("x", d => xScale(d.position.x))
        .attr("y", d => yScale(d.position.y))
        .attr("fill", d => color(d[1]))
        .text(d => `(${d.position.x},${d.position.y})`);

        // Node event listeners
        this.nodes = this.svg.append("g") 
        .selectAll("person") 
        .data(this.dataset.persons)
        .enter() 
        .append("circle")
        .attr("cx", d => xScale(d.position.x))
        .attr("cy", d => yScale(d.position.y))
        .attr("r", 5)
        .attr("stroke-width", 3)
        .attr("stroke", "black")
        .attr("fill", "red")
        .on("mouseover", this.handleMouseOver.bind(this)) 
        .on("mouseout", this.handleMouseOut.bind(this));
    }

    // MouseOver event
     handleMouseOver(data, i) { 
        this.links = this.svg.append("g")
        .attr("class", "links")
        .selectAll("line") 
        .data(this.dataset["links"])
        .enter()
        .filter(d => d.source.name === data.name) 
        .append("line")
        .attr("stroke-width", 3)
        .attr("style", "stroke:rgb(0,255,0)") 
        .attr("x1", d => d.source.position.x) 
        .attr("y1", d => d.source.position.y) 
        .attr("x2", d => d.target.position.x) 
        .attr("y2", d => d.target.position.y);
    }
        
    //MouseOut event
    handleMouseOut(d,i) { 
        this.svg.selectAll("g.links").remove();
    }
}