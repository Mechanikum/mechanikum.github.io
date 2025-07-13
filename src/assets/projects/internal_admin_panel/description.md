A debugging tool essentially. Don't have a slightest idea what all those graphs represent, so I acted solely on request of backend developer who needed a way to visualise all this data.

So, there is, a heatmap, which lights up based on data retrieved from REST API after changing form fields on the right. Then clicking on any of heatmap elements leads you to the charts page with two tabs: scroing and trading. 

First one shows how different parameters behave on different sensitivity (X axis) values, clicking anywhere on the chart sets sensitivity value for the other tab. Any of the lines (or line categories) can be hidden. The whole chart and its controls is composed from backend data, so adding another line is just adding a new entry to API response, no frontend adjustments needed. 

Second tab is a candle chart with marks of different exchange positions. Whole thing is interactive and allows to 
zoom in, pan around and changes candle "resolution" based on how closely you zoomed in and timeframe config.

Probably it would be wiser to set up Grafana, but developer who requested the whole thing was pretty happy 
with end result.