
gsap.registerPlugin(Draggable);
window.onload = function (){
            const timeline = document.querySelector(".timeline")
            const scroller = document.querySelector(".scroller")
            const container = document.querySelector(".wrapper")
            const body = document.body

            const timelineWidth = timeline.offsetWidth
            const scrollerWidth = scroller.offsetWidth

            const gap = parseInt(window.getComputedStyle(body).fontSize)
            const maxDragx = timelineWidth - scrollerWidth - (2 * gap)

            const markerCount = window.innerWidth < 768 ? 25 : 50;
            for(let i= 0;i < markerCount;i++){
                const marker = document.createElement('div')
                marker.classList.add("marker")
                timeline.appendChild(marker)
            }

            Draggable.create(scroller,{
                type:"x",
                bounds:{
                    minX:gap,
                    maxX:timelineWidth - scrollerWidth - gap
                },
                onDrag: function(){
                    let progress = (this.x - gap) / maxDragx;
                    let containerX = -400 * (timelineWidth / 100) * progress
                    
                    gsap.to(container,{
                       x:containerX,
                       duration:1,
                       ease:"power3.out" 
                    })
                },
                onPress: function() {
                    gsap.to(scroller, {scale: 1.1, duration: 0.2});
                },
                onRelease: function() {
                    gsap.to(scroller, {scale: 1, duration: 0.2});
                }
            })

            let resizeTimeout;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function() {
                    const newTimelineWidth = timeline.offsetWidth;
                    const newMaxDragx = newTimelineWidth - scrollerWidth - (2 * gap);
                    
                    const draggable = Draggable.get(scroller);
                    if (draggable) {
                        draggable.applyBounds({
                            minX: gap,
                            maxX: newTimelineWidth - scrollerWidth - gap
                        });
                    }
                }, 250);
            });
        }